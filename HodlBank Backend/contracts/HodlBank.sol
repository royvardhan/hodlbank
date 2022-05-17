//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HodlBank {

    event HodlerAdded(address indexed hodler, uint amount, uint unlockDate);
    
    struct Hodler {
        address owner;
        uint amount;
        uint unlockDate;
    }

    Hodler[] public hodlers;

    mapping (address => Hodler) public addressToHodler;

    function lockFunds(uint _amount, uint _unlockDate) public payable {
        require(_amount >= 0.01 ether && msg.value >= _amount , "Amount must be greater than 0.01 ether");
        require(_unlockDate > block.timestamp, "Unlock date must be in the future");
        hodlers.push(Hodler(msg.sender, _amount, _unlockDate));
        addressToHodler[msg.sender] = hodlers[hodlers.length - 1];
        emit HodlerAdded(msg.sender, _amount, _unlockDate);
    }

    function withdrawFunds(uint _amount) public {
        require(msg.sender == addressToHodler[msg.sender].owner, "Only the owner can withdraw funds");
        require(addressToHodler[msg.sender].amount >= _amount, "Not enough funds");
        require(addressToHodler[msg.sender].unlockDate >= block.timestamp, "Funds are locked");
        addressToHodler[msg.sender].amount -= _amount;
        payable(msg.sender).transfer(_amount);
        
    }

    function getHodlers() public view returns (uint) {
        return hodlers.length;
    }

    function getHodlerData(address _address) public view returns (uint, uint) {
        require(_address == addressToHodler[_address].owner, "This address is not a hodler");
        return (addressToHodler[_address].amount, addressToHodler[_address].unlockDate);
    }

    function getHodlerUnlockDateIndexInDays(address _owner) public view returns (uint) {
        require(_owner == addressToHodler[_owner].owner, "This address is not a hodler");
        return (addressToHodler[_owner].unlockDate - block.timestamp) / 86400;

    }

    function getHodlerUnlockDateIndexInMinutes(address _owner) public view returns (uint) {
        require(_owner == addressToHodler[_owner].owner, "This address is not a hodler");
        return (addressToHodler[_owner].unlockDate - block.timestamp) / 60;
    }

    function getHodlerUnlockDateIndexInHours(address _owner) public view returns (uint) {
        require(_owner == addressToHodler[_owner].owner, "This address is not a hodler");
        return (addressToHodler[_owner].unlockDate - block.timestamp) / 3600;
    }




}