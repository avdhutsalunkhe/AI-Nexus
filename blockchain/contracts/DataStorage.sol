// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DataStorage {
    struct Record {
        string ipfsHash;
        address owner;
        uint256 timestamp;
        string description;
    }
    
    mapping(uint256 => Record) public records;
    uint256 public recordCount;
    
    event RecordStored(uint256 indexed id, string ipfsHash, address indexed owner, uint256 timestamp);
    
    function storeRecord(string memory _ipfsHash, string memory _description) public returns (uint256) {
        recordCount++;
        records[recordCount] = Record(_ipfsHash, msg.sender, block.timestamp, _description);
        emit RecordStored(recordCount, _ipfsHash, msg.sender, block.timestamp);
        return recordCount;
    }
    
    function getRecord(uint256 _id) public view returns (Record memory) {
        require(_id > 0 && _id <= recordCount, "Record does not exist");
        return records[_id];
    }
    
    function getMyRecords() public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= recordCount; i++) {
            if (records[i].owner == msg.sender) count++;
        }
        
        uint256[] memory myRecords = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= recordCount; i++) {
            if (records[i].owner == msg.sender) {
                myRecords[index] = i;
                index++;
            }
        }
        return myRecords;
    }
}
