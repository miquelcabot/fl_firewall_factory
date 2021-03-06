const TestContract1 = artifacts.require("TestContract1");

module.exports = function (deployer) {
  deployer.deploy(TestContract1);
};
