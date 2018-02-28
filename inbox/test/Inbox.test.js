const assert = require('assert');
const ganache = require()

/*3 main functions we need to be aware of...
 it        - to run a test and make an assertion, take 2 values..one our code has produced and one we think it should be..
 describe  - groups together a collection of 'it' functions
 beforeEach -  executes some general setup code


/* Git clone code..

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