// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "../src/erc20-upgradble-v1.sol";
import "../src/erc20-upgradble-v2.sol";

import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {Script} from "forge-std/Script.sol";

contract DeployUUPSProxy is Script {
    // function run() public {
    //     address _implementation = 0x531DF86a3121643275B047d2EE6496cFdb7dd270; // Replace with your token address
    //     vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
    //     // Encode the initializer function call
    //     bytes memory data = abi.encodeWithSelector(
    //         VishnuV1(_implementation).initialize.selector,
    //         msg.sender // Initial owner/admin of the contract
    //     );
    //     // Deploy the proxy contract with the implementation address and initializer
    //     ERC1967Proxy proxy = new ERC1967Proxy(_implementation, data);
    //     vm.stopBroadcast();
    //     // Log the proxy address
    //     console.log("UUPS Proxy Address:", address(proxy));
    // }
    // Run function to upgrade the proxy
    // function run() public {
    //     address proxy = 0xcd74399B49C42231838bfDABa7E770e748C2E217; // Replace with your proxy address
    //     vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
    //     VishnuV2 newImplementation = new VishnuV2();
    //     VishnuV2(proxy).upgradeToAndCall(
    //         address(newImplementation),
    //         abi.encodeCall(VishnuV2.initialize, (msg.sender))
    //     );
    //     vm.stopBroadcast();
    // }
    function run() public {
        // Implementation contract address
        address implementationV1 = 0x531DF86a3121643275B047d2EE6496cFdb7dd270;
        address proxyAddress = Upgrades.deployUUPSProxy(
            implementationV1,
            abi.encodeCall(VishnuV1.initialize, (msg.sender))
        );
        console.log("UUPS contract deployed :", proxyAddress);
    }
}
