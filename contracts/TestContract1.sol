pragma solidity ^0.5.16;

contract TestContract1 {
    uint private storedData;

    function set(uint _storedData) public {
        storedData = _storedData;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
