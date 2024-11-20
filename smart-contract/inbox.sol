// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Inbox {
    string[] private message;

    function setMessage(string calldata incomingMessage) external {
        message.push(incomingMessage);
    }

    function getMessage(uint msgId) external view returns (string memory) {
        require(msgId < message.length, "Error: Msg not found in given id");
        return message[msgId];
    }
}
