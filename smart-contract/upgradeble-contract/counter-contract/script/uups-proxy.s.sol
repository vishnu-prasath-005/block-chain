// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../src/erc20-upgradble-v1.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "forge-std/Script.sol";

contract DeployUUPSProxy is Script {
    function run() public {
        address _implementation = 0x531DF86a3121643275B047d2EE6496cFdb7dd270; // Replace with your token address
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        // Encode the initializer function call
        bytes memory data = abi.encodeWithSelector(
            VishnuV1(_implementation).initialize.selector,
            msg.sender // Initial owner/admin of the contract
        );

        // Deploy the proxy contract with the implementation address and initializer
        ERC1967Proxy proxy = new ERC1967Proxy(_implementation, data);

        vm.stopBroadcast();
        // Log the proxy address
        console.log("UUPS Proxy Address:", address(proxy));
    }
}
