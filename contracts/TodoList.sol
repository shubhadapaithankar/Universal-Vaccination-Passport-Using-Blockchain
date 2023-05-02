pragma solidity ^0.5.0;

contract TodoList {
  uint public recordCount = 0;

  struct Record {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Record) public records;

  event RecordCreated(
    uint id,
    string content,
    bool completed
  );

  event RecordCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createRecord("Check out vaccination Record");
  }

  function createRecord(string memory _content) public {
    recordCount ++;
    records[recordCount] = Record(recordCount, _content, false);
    emit RecordCreated(recordCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Record memory _record = records[_id];
    _record.completed = !_record.completed;
    records[_id] = _record;
    emit RecordCompleted(_id, _record.completed);
  }

}
