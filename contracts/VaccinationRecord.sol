pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract VaccinationRecord {
  uint public recordCount = 0;

  struct VaccinationRecord {
    uint256 id;
    string name; 
    string dateOfFirstDose;
    string dateOfSecondDose;
    string typeOfVaccine;
    string content;
  }

  mapping(uint256 => VaccinationRecord) public vaccinationRecordMappings;

  event RecordCreated(
    uint256 id,
    string name, 
    string dateOfFirstDose,
    string dateOfSecondDose,
    string typeOfVaccine,
    string content
  );

  event RecordFetched(
    uint256 id,
    string name, 
    string dateOfFirstDose,
    string dateOfSecondDose,
    string typeOfVaccine,
    string content
  );

  constructor() public {
    createRecord(1, "name", "dateOfFirstDose", "dateOfSecondDose", "typeOfVaccine", "content");
  }

  function createRecord(uint256 id, string memory name, string memory dateOfFirstDose, string memory dateOfSecondDose, string memory typeOfVaccine, string memory content) public {
    recordCount ++;
    vaccinationRecordMappings[id] = VaccinationRecord(id, name, dateOfFirstDose, dateOfSecondDose, typeOfVaccine, content);
    emit RecordCreated(id, name, dateOfFirstDose, dateOfSecondDose, typeOfVaccine, content);
  }



  function getRecord(uint256 id) public returns(VaccinationRecord memory record){
    VaccinationRecord memory fetchedRecord = vaccinationRecordMappings[id];

    if (fetchedRecord.id > 0) {
        emit RecordFetched(fetchedRecord.id, fetchedRecord.name, fetchedRecord.dateOfFirstDose, fetchedRecord.dateOfSecondDose, fetchedRecord.typeOfVaccine, fetchedRecord.content);
        return fetchedRecord;
    }

    VaccinationRecord memory emptyRecord; 
    return emptyRecord;
  }


}
