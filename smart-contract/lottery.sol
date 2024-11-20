// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lottery {
    address private manager;
    address private owner;
    address[] private palyers;
    bool private isLotteryStarted;

    constructor() {
        owner = msg.sender;
    }

    modifier checkIsOwner() {
        require(msg.sender == owner, "Only the owner can access.");
        _;
    }

    modifier checkIsMagerOrOwner() {
        require(
            msg.sender == owner || msg.sender == manager,
            "Only the manager and owner can access."
        );
        _;
    }

    modifier checkLotteryIsStarted() {
        require(isLotteryStarted, "Lottery is not started yet");
        _;
    }

    function startLottery() external checkIsMagerOrOwner {
        isLotteryStarted = true;
    }

    function setManager(address managerAddress) external checkIsOwner {
        manager = managerAddress;
    }

    function enter(
        address palyerAddress
    ) external payable checkLotteryIsStarted {
        require(msg.value > .0000000001 ether, "You dont have enough amount");
        palyers.push(palyerAddress);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.number, block.timestamp, palyers)
                )
            );
    }

    function pickWinner() external checkIsMagerOrOwner checkLotteryIsStarted {
        require(palyers.length > 0, "No palyer is joined in this lottery");
        uint256 index = random() % palyers.length;
        payable(palyers[index]).transfer(address(this).balance);
        delete palyers;
    }

    function getPlayers() external view returns (address[] memory) {
        return palyers;
    }
}
