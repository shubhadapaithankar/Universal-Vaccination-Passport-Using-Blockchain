var vaccinationRecord = artifacts.require("./VaccinationRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(vaccinationRecord);
};