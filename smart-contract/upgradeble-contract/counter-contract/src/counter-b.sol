// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
/// @custom:oz-upgrades-from ContractA
contract ContractB is Initializable {
    uint public counterValue;

    function initialize(uint setValue) external initializer {
        counterValue = setValue;
    }

    function incremetCounter(uint value) external {
        counterValue += value;
    }
}
