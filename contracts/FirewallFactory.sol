pragma solidity ^0.5.16;

import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract FirewallFactory is Ownable {
  // Mapping of whitelisted contracts bytecode
  mapping(bytes => bool) internal _whitelist;

  // Event emitted on failure to indicate the problem
  event ErrorEvent(string error);

  // Add contract bytecode to the whitelist
  // Only the contract owner should be able to add to whitelist
  function addToWhiteList(bytes memory _bytecode) public onlyOwner returns (bool) {
    // We add the bytecode of the contract to the whitelist mapping
    // setting the value of "is in the whitelist" to true
    _whitelist[_bytecode] = true;
    return true;
  }

  // Remove contract bytecode from the whitelist
  // Only the contract owner should be able to remove from whitelist
  function removeFromWhiteList(bytes memory _bytecode) public onlyOwner returns (bool) {
    // We add the bytecode of the contract to the whitelist mapping
    // setting the value of "is in the whitelist" to false
    _whitelist[_bytecode] = false;
    return true;
  }

  // Deploys the contract bytecode if it's in the whitelist
  // and its address returned.
  // If fails an event indicating the problem is thrown
  function deploy(bytes memory _bytecode) public returns (address) {
    if (_whitelist[_bytecode]) {
      // If the bytecode is in the whitelist, we create the contract
      address new_contract;
      assembly {
        let encoded_data := add(0x20, _bytecode)
        let encoded_size := mload(_bytecode)
        new_contract := create(0, encoded_data, encoded_size)
      }
      return new_contract;
    } else {
      // If the bytecode is not in the whitelist we show the error
      emit ErrorEvent("This bytecode is not in the whitelist");
    }
  }
}
