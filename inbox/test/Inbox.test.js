//from Inbox.test.js in EthereumCasts inbox example.

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
//const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile'); //up one directory so need to ..

//have to deploy a contract every time we run a test.
// so need to check our ganache accounts.
//Web3 is asynchronous so always returns promises

//we can refactor this to async await..

/*beforeEach(() => {
    //Get a list of all accounts.. .then takes a function
    web3.eth.getAccounts().then(fetchedAccounts => {
            console.log(fetchedAccounts);
    });
*/

//define variables ahead of time with let so all can access it.
//Using async await so don't need to use .then anymore. Looks cleaner
let accounts; // accounts variable is defined.
let inbox;
//const INITIAL_STRING = 'Hi there!'
// to deploy contract we need access to the bytecode.. compile.js.. interface and bytecode properties. interface is json and bytecode is raw eth

//Get a list of all accounts.. .then takes a function
//put await in front of statement that returns us our promise
//async let's us know it's asynchronous in nature
//assigns list of accounts to accounts variable..
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
//Use one of those accounts to deploy the contract

//constructor function, creating an instance of a contract.
// 2 arguments. Data is bytecode, whenever we start contract have to pass initial arguments
//contract can use up to 1 million gas
//Contract lets us deploy contracts or interact with deployed contracts.. we want a js object
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // just says there is a contract out there with an interface
        .deploy({ data: bytecode, arguments: ['Hi there!'] })// tells web3 we wanna deploy a contract, creates a transaction object with arguments property to pass into the contructor function of the contract.
        // if we had two arguments to pass in .deploy({ data: bytecode, arguments: ['Hi there!', 'ownercestmoi'] })
        .send({ from: accounts[0], gas: '1000000' }) // send is what sends to the network, not deploy
    inbox.setProvider(provider);

});

//Web3 with Contracts.. To interact, only need abi and address of deployed contract.
//to create a contract, only need ABI and Bytecode.

//^ We can then see our deployed contract!
// new web3.eth.Contract(JSON.parse(interface) teaches web3 about what methods an Inbox contract has
// .deploy tells web3 that we want to deploy a new copy of this contract.
//.send instruct web3 to send out a transaction that creates this contract.

//adding another test, this is a real sort of test.
// Make sure that it has a default message"
//2nd it statement is calling a method.. still asynchronous
describe('Inbox', () => {
    it('deploys a contract', () => {
        //console.log(accounts);
        console.log(inbox);
        assert.ok(inbox.options.address);
    });

    //methods are setMessage and message. 2 methods tied to the contract.
    //We're calling message method here... well be using inbox.methods style syntax a lot
// for transaction we would be using .send(who sending to and gas)
//retrieves our message and asserts value of message
// we could also write InitialMessage variable = Hi there! in case ppl change it, and pass in variable
//Test is getting a default value. Method is the ability to change or retrieve data from the contract.
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!'); // or assert.equal(message, INITIAL_STRING)
    });

    //send transaction.. who is paying for it.. ganache cli created accounts, we can simply say from: accounts[0]
    //tx hash we get back is like receipt of the transaction.
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send( { from: accounts[0]})
        const message = await inbox.methods.message().call(); //retrieves message changed..
        assert.equal(message, 'bye');
    });
});

/*
Inbox
Contract {
    currentProvider: [Getter/Setter],
        _requestManager:
    RequestManager {
        provider:
            Provider {
            options: [Object],
                engine: [Web3ProviderEngine],
                manager: [GethApiDouble] },
        providers:
        { WebsocketProvider: [Function: WebsocketProvider],
            HttpProvider: [Function: HttpProvider],
            IpcProvider: [Function: IpcProvider] },
        subscriptions: {} },
    givenProvider: null,
        providers:
    { WebsocketProvider: [Function: WebsocketProvider],
        HttpProvider: [Function: HttpProvider],
        IpcProvider: [Function: IpcProvider] },
    _provider:
        Provider {
        options: { logger: [Object] },
        engine:
            Web3ProviderEngine {
            domain: null,
                _events: [Object],
                _eventsCount: 1,
                _maxListeners: 100,
                _ready: [Stoplight],
                _pollingShouldUnref: true,
                _pollingInterval: 4000,
                currentBlock: [Object],
                _providers: [Array],
                manager: [GethApiDouble],
                _pollIntervalId: [Timeout] },
        manager:
            GethApiDouble {
            state: [StateManager],
                options: [Object],
                initialized: true,
                initialization_error: null,
                post_initialization_callbacks: [],
                engine: [Web3ProviderEngine],
                currentBlock: [Object] } },
    setProvider: [Function],
        BatchRequest: [Function: bound Batch],
    extend:
    { [Function: ex]
        formatters:
        { inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
            inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
            inputCallFormatter: [Function: inputCallFormatter],
            inputTransactionFormatter: [Function: inputTransactionFormatter],
            inputAddressFormatter: [Function: inputAddressFormatter],
            inputPostFormatter: [Function: inputPostFormatter],
            inputLogFormatter: [Function: inputLogFormatter],
            inputSignFormatter: [Function: inputSignFormatter],
            outputBigNumberFormatter: [Function: outputBigNumberFormatter],
            outputTransactionFormatter: [Function: outputTransactionFormatter],
            outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
            outputBlockFormatter: [Function: outputBlockFormatter],
            outputLogFormatter: [Function: outputLogFormatter],
            outputPostFormatter: [Function: outputPostFormatter],
            outputSyncingFormatter: [Function: outputSyncingFormatter] },
        utils:
        { _fireError: [Function: _fireError],
            _jsonInterfaceMethodToString: [Function: _jsonInterfaceMethodToString],
            randomHex: [Function: randomHex],
            _: [Function],
                BN: [Function],
            isBN: [Function: isBN],
            isBigNumber: [Function: isBigNumber],
            isHex: [Function: isHex],
            isHexStrict: [Function: isHexStrict],
            sha3: [Function],
                keccak256: [Function],
            soliditySha3: [Function: soliditySha3],
            isAddress: [Function: isAddress],
            checkAddressChecksum: [Function: checkAddressChecksum],
            toChecksumAddress: [Function: toChecksumAddress],
            toHex: [Function: toHex],
            toBN: [Function: toBN],
            bytesToHex: [Function: bytesToHex],
            hexToBytes: [Function: hexToBytes],
            hexToNumberString: [Function: hexToNumberString],
            hexToNumber: [Function: hexToNumber],
            toDecimal: [Function: hexToNumber],
            numberToHex: [Function: numberToHex],
            fromDecimal: [Function: numberToHex],
            hexToUtf8: [Function: hexToUtf8],
            hexToString: [Function: hexToUtf8],
            toUtf8: [Function: hexToUtf8],
            utf8ToHex: [Function: utf8ToHex],
            stringToHex: [Function: utf8ToHex],
            fromUtf8: [Function: utf8ToHex],
            hexToAscii: [Function: hexToAscii],
            toAscii: [Function: hexToAscii],
            asciiToHex: [Function: asciiToHex],
            fromAscii: [Function: asciiToHex],
            unitMap: [Object],
                toWei: [Function: toWei],
            fromWei: [Function: fromWei],
            padLeft: [Function: leftPad],
            leftPad: [Function: leftPad],
            padRight: [Function: rightPad],
            rightPad: [Function: rightPad],
            toTwosComplement: [Function: toTwosComplement] },
        Method: [Function: Method] },
    clearSubscriptions: [Function],
        options:   //options.address is where contract now sits at.
    { address: [Getter/Setter],  // will be where contract sits.. can write tests to make sure it exists
        jsonInterface: [Getter/Setter],
        data: undefined,
        from: undefined,
        gasPrice: undefined,
        gas: undefined },
    defaultAccount: [Getter/Setter],
        defaultBlock: [Getter/Setter],
        methods:   //Most important property.. can call these.. same as calling setMessage button on remix and message button too.
    { setMessage: [Function: bound _createTxObject],
        '0x368b8772': [Function: bound _createTxObject],
        'setMessage(string)': [Function: bound _createTxObject],
        message: [Function: bound _createTxObject],
        '0xe21f37ce': [Function: bound _createTxObject],
        'message()': [Function: bound _createTxObject] },
    events: { allEvents: [Function: bound ] },
    _address: '0x11b1dC7F30a28EC79821dd3C7f915B134Cd7C384',
        _jsonInterface:
    [ { constant: false,
        inputs: [Array],
        name: 'setMessage',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x368b8772' },
        { constant: true,
            inputs: [],
            name: 'message',
            outputs: [Array],
            payable: false,
            stateMutability: 'view',
            type: 'function',
            signature: '0xe21f37ce' },
        { inputs: [Array],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
            signature: 'constructor' } ] }
    ✓ deploys a contract


1 passing (173ms)
*/






//whenever someone calls park, we will return stopped..
//basic unit test, success 28/2/18 :)
/*
class Car {
    park() {
    return 'stopped'
    }


    drive() {
    return 'vroom';
    }
}
*/

//Assertion logic using the asset library from node, write tests with this library..
// pass in string of Car, just to have something for testing report.. could be CarClass..anything we want
//2nd argument will be an arrow function, contains all the different it test statements. Could have one or more it statements, sring describes purpose of test.. 2nd argument another arrow function sets up actual test setup and assertion logic. Make sure that when we call park the string stopped is called. so we need to create an instance of Car. Then write an assertion that we're returning the word stopped. Use assert library, part of standard node library.. write out value produced by our code.. car.park... then assert value we think it should be.. 'stopped'
// assert.equal tries to make sure that the code is both equal. to make mocha run in our file... run a script in package.json file..
// in package.json... tests: mocha
//cli terminal command... npm run test...  both it statements need an instance of Car object
// Declaring variable car inside function, scope...only available within that function..
// eg, not available within the it statements... to deal with this we can take our variable declaration and move it outside .

//variable declaration here lets u initialise car in before each. Delete const from beforeEach
    // we want to use let here instead of const because car changes each time

/* The actual test. Commented out..
let car;

beforeEach(() => {
    //const car = new Car();
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
    //const car = new Car();
    assert.equal(car.park(), 'stopped');
});


    it('can drive', () => {
    //const car = new Car();
    assert.equal(car.drive(), 'vroom');
    });

});
*/


/* Old style without before each.. instantiating new car each time not necessary anymore.
describe('Car', () => {
    it('can park', () => {
    const car = new Car();
    assert.equal(car.park(), 'stopped');
    });


    it('can drive', () => {
        const car = new Car();
        assert.equal(car.drive(), 'vroom');
    });

});
//describe just groups together this group of it statements.
// before describe statement, we can make a beforeEach before each it statement. Something general for all multiple tasks..



/*3 main functions we need to be aware of...
 it        - to run a test and make an assertion, take 2 values..
 one our code has produced and one we think it should be..
 describe  - groups together a collection of 'it' functions
 beforeEach -  executes some general setup code


/* Git cloned code..

const assert = require('assert');
const ganache = require('ganache-cli');
// as Web3 is a constructor function, by tradition we make it capital W.
const Web3 = require('web3');
//assign instance to lowercase web3, tells instance to connect to local test network..
//replace provider with a different provider like rinkeby etc when you wanna change networks
//interface is abi, bytecode is the raw data
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

//using async await syntax instead of .then all the time
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
*/