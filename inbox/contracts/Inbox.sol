pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    //could add string owner.. function Inbox(string initialMessage, string owner) public {
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
