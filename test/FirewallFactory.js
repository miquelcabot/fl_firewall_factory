let FirewallFactory = artifacts.require('FirewallFactory');
let TestContract1 = artifacts.require('TestContract1');
let TestContract2 = artifacts.require('TestContract2');

contract('FirewallFactory', (accounts) => {
  it ('deploys the smart contract', async () => {
    let firewallInstance = await FirewallFactory.deployed();
    assert.ok(firewallInstance.address, 'the smart contract has an address');
  });

  it ('initializes the contract with an owner', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    // We initialize the contract with the accounts[0] owner
    await firewallInstance.initialize(accounts[0]);
    let owner = await firewallInstance.owner();
    assert.equal(owner, accounts[0], 'the owner is the accounts[0]');
  });

  it ('only contract owner can add to whitelist', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    // We add a contract bytecode to the whitelist
    // from a non-owner account
    try {
      await firewallInstance.addToWhiteList(TestContract1.bytecode, { from: accounts[1] });
      assert(false, 'throw an error when no-owner adds to whitelist');
    } catch (err) {
      assert(err, 'throw an error when no-owner adds to whitelist');
    }
  });

  it ('only contract owner can remove from whitelist', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    // We remove a contract bytecode from the whitelist
    // from a non-owner account
    try {
      await firewallInstance.removeFromWhiteList(TestContract1.bytecode, { from: accounts[1] });
      assert(false, 'throw an error when no-owner removes from whitelist');
    } catch (err) {
      assert(err, 'throw an error when no-owner removes from whitelist');
    }
  });

  it ('adds a contract bytecode to the whitelist', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    // We add a contract bytecode to the whitelist
    await firewallInstance.addToWhiteList(TestContract1.bytecode, { from: accounts[0] });
    await firewallInstance.addToWhiteList(TestContract2.bytecode, { from: accounts[0] });
    await firewallInstance.removeFromWhiteList(TestContract1.bytecode, { from: accounts[0] });
  });

  it ('deploys a whitelisted smart contract', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    let newContract = await firewallInstance.deploy.call(TestContract2.bytecode);
    console.log(`Deployed smart contract address: ${newContract}`);
    assert.ok(newContract, 'deploys an smart contract');
  });

  it ('throws an event with the failure information', async () => {
    let firewallInstance = await FirewallFactory.deployed();

    let deployResponse = await firewallInstance.deploy(TestContract1.bytecode);
    console.log(`Event error information: ${deployResponse.logs[0].args.error}`);
    assert.ok(deployResponse.logs[0].args.error, 'throws an event with the failure information')
  });
})
