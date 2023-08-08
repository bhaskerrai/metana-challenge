// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SomeFile {
    uint256 private constant someVar = 20;

    function getSomeVar() external pure returns (uint256) {
        return someVar;
    }
}