pragma solidity ^0.4.17;

contract Lottery {
    //order....type, visibility and variable name
    //public or private specifies to devs whether they can easily access the variable
    address public manager;
    // cause it's public can only access one array element at a time..
    address[] public players;

    //assigns whoever deploys the contract and assigns the manager variable
    //global variable..means we don't have to do any declaration for msg .. magically available
    function Lottery() public {
        manager = msg.sender;
    }

    //we expect someone when they call this function to send along some ether.
    //require is used for validation.. if it was false then the entire function stops running
    //rather than writing 100000000 for wei etc.. can specify ether helper
    // in remix or mist add ur ether value to the Value textbox..
    //require failures don't really give messages why it failed. Be aware..
    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    // random number generator. No button or ability to call this as it's private
    //can also use sha3 is an instance of keccak256 instead of keccak256 (particular algorithm) same thing. 
    //keccak256 is a global variable.. passing in array of players, simply named as players
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    //send money to the address
    function pickWinner() public restricted {
        //require(msg.sender == manager)
        uint index = random() % players.length;
        players[index].transfer(this.balance);  //players is an address hash.. 0x3434434 etc
        //addresses have methods tied to them, not just strings, 
        //we can send money to that address by calling .transfer
        players = new address[](0);
        //new is like a reset so overwriting the players = new address[]
    }

    //this modifier helps us stop repeating ourselves and reduces code we have to write..
    //cld have called it anything, not just restricted
    // _ would be the whole pickWinner function.. or any of the functions with restricted
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    function getPlayers() public view returns (address[]) {
        return players;
    }
}
