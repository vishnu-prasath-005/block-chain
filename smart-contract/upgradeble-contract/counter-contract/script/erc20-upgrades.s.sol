// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../src/erc20-upgradble-v1.sol";
import "forge-std/Script.sol";

contract DeployTokenImplementation is Script {
    function run() public {
        // Use address provided in config to broadcast transactions
        vm.startBroadcast();
        // Deploy the ERC-20 token
        VishnuV1 implementation = new VishnuV1();
        // Stop broadcasting calls from our address
        vm.stopBroadcast();
        // Log the token address
        console.log("Token Implementation Address:", address(implementation));
    }
}

// forge clean && forge script script/upgrades.s.sol --rpc-url sepolia --private-key c9a839889fa639f66d134527b50731a02445e26f9ae0e6f9b945aa8fc809df54
// --broadcast --verify --sender 0x06FC2521526ED0f47F0eAA9eB6f8220534247F7E
