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
    string email;
    string content;
  }

  mapping(uint256 => VaccinationRecord) public vaccinationRecordMappings;
  mapping(string => uint256[]) private emailToRecordIds; // Mapping to hold record IDs for each email

  event RecordCreated(
    uint256 id,
    string name, 
    string dateOfFirstDose,
    string dateOfSecondDose,
    string typeOfVaccine,
    string email,
    string content
  );

  event RecordFetched(
    uint256 id,
    string name, 
    string dateOfFirstDose,
    string dateOfSecondDose,
    string typeOfVaccine,
    string email,
    string content
  );

  constructor() public {
    createRecord(1, "name", "dateOfFirstDose", "dateOfSecondDose", "typeOfVaccine", "email", "content");
  }

  function createRecord(uint256 id, string memory name, string memory dateOfFirstDose, string memory dateOfSecondDose, string memory typeOfVaccine, string memory email, string memory content) public {
    recordCount ++;
    vaccinationRecordMappings[id] = VaccinationRecord(id, name, dateOfFirstDose, dateOfSecondDose, typeOfVaccine, email, content);
    emailToRecordIds[email].push(id); // Associate this record ID with the email
    emit RecordCreated(id, name, dateOfFirstDose, dateOfSecondDose, typeOfVaccine, email, content);
  }


  function getRecordsByEmail(string memory email) public view returns (VaccinationRecord[] memory) {
        uint256[] memory recordIds = emailToRecordIds[email];
        VaccinationRecord[] memory records = new VaccinationRecord[](recordIds.length);

        for (uint256 i = 0; i < recordIds.length; i++) {
            records[i] = vaccinationRecordMappings[recordIds[i]];
        }

        return records;
    }


  function getRecord(uint256 id) public returns(VaccinationRecord memory record){
    VaccinationRecord memory fetchedRecord = vaccinationRecordMappings[id];

    if (fetchedRecord.id > 0) {
        emit RecordFetched(fetchedRecord.id, fetchedRecord.name, fetchedRecord.dateOfFirstDose, fetchedRecord.dateOfSecondDose, fetchedRecord.typeOfVaccine, fetchedRecord.email, fetchedRecord.content);
        return fetchedRecord;
    }

    VaccinationRecord memory emptyRecord; 
    return emptyRecord;
  }


}
