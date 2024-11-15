// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";

import {ContractA} from "../src/counter-a.sol";
import {ContractB} from "../src/counter-b.sol";

import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";

contract UpgradesScript is Script {
    function setUp() public {}

    // Function to deploy the intial contract(v1)

    // function run() public {
    //     uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    //     vm.startBroadcast(deployerPrivateKey);

    //     // Deploy `ContractA` as a transparent proxy using the Upgrades Plugin
    //     address transparentProxy = Upgrades.deployTransparentProxy(
    //         "out/counter-a.sol/ContractA.json",
    //         msg.sender,
    //         abi.encodeCall(ContractA.initialize, 10)
    //     );
    // }

    // Function to deploy the upgradble contract(v2)

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Specifying the address of the existing transparent proxy
        address transparentProxy = 0x4427Ea53315439a7f388E260BA0799902235F01f;

        // Setting options for validating the upgrade
        Options memory opts;
        opts.referenceContract = "out/counter-a.sol/ContractA.json";

        // Validating the compatibility of the upgrade
        Upgrades.validateUpgrade("out/counter-b.sol/ContractB.json", opts);

        // Upgrading to ContractB and attempting to increase the value
        Upgrades.upgradeProxy(
            transparentProxy,
            "out/counter-b.sol/ContractB.json",
            abi.encodeCall(ContractB.incremetCounter, (15))
        );
    }
}
