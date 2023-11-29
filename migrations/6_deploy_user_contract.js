var userContract = artifacts.require("./UserContract.sol");

module.exports = function(deployer) {
  deployer.deploy(userContract);
};