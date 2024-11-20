// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {WhiteListContract} from "../src/white-list-token.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        WhiteListContract whiteListContract = new WhiteListContract();
        vm.stopBroadcast();
    }
}
