var ConvertLib = artifacts.require("./ConvertLib.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
};