const FirewallFactory = artifacts.require("FirewallFactory");

module.exports = function (deployer) {
  deployer.deploy(FirewallFactory);
};
