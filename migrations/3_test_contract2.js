const TestContract2 = artifacts.require("TestContract2");

module.exports = function (deployer) {
  deployer.deploy(TestContract2);
};
