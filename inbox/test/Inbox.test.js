const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//whenever someone calls park, we will return stopped..
//basic unit test, success 28/2/18 :)
class Car {
    park() {
    return 'stopped'
    }


    drive() {
    return 'vroom';
    }
}

//Assertion logic using the asset library from node, write tests with this library..
// pass in string of Car, just to have something for testing report.. could be CarClass..anything we want
//2nd argument will be an arrow function, contains all the different it test statements. Could have one or more it statements, sring describes purpose of test.. 2nd argument another arrow function sets up actual test setup and assertion logic. Make sure that when we call park the string stopped is called. so we need to create an instance of Car. Then write an assertion that we're returning the word stopped. Use assert library, part of standard node library.. write out value produced by our code.. car.park... then assert value we think it should be.. 'stopped'
// assert.equal tries to make sure that the code is both equal. to make mocha run in our file... run a script in package.json file..
// in package.json... tests: mocha
//cli terminal command... npm run test...
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