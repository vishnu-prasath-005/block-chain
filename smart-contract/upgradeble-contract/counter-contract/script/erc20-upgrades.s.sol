// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../src/erc20-upgradble-v1.sol";
import "../src/erc20-upgradble-v2.sol";

import "forge-std/Script.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";

contract DeployTokenImplementation is Script {
    function run() public {
        // Use address provided in config to broadcast transactions
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        // Deploy the ERC-20 token

        // VishnuV1 implementation = new VishnuV1();
        // address proxy = Upgrades.deployUUPSProxy(
        //     "out/erc20-upgradble-v1.sol/VishnuV1.json",
        //     abi.encodeCall(VishnuV1.initialize, (msg.sender))
        // );
        Upgrades.upgradeProxy(
            0x71ec933C4f7828895eE02327f81972ab8d73F1Ae,
            "out/erc20-upgradble-v2.sol/VishnuV2.json",
            ""
        );

        // Stop broadcasting calls from our address
        vm.stopBroadcast();
        // Log the token address
        // console.log("Token Implementation Address:", address(updatedProxy));
    }
}

// forge clean && forge script script/upgrades.s.sol --rpc-url sepolia --private-key c9a839889fa639f66d134527b50731a02445e26f9ae0e6f9b945aa8fc809df54
// --broadcast --verify --sender 0x06FC2521526ED0f47F0eAA9eB6f8220534247F7E
