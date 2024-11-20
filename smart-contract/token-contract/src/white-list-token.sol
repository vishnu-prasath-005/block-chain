// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WhiteListContract is ERC20 {
    address private owner;
    uint256 private constant DECIMALS = 10 ** uint256(18);
    mapping(address => bool) private whiteList;

    constructor() ERC20("TokenWhite", "TW") {
        _mint(_msgSender(), (2000000 * DECIMALS));
        owner = _msgSender();
    }

    modifier onlyOwner() {
        require(_msgSender() == owner, "Only owner can access");
        _;
    }

    function transfer(
        address to,
        uint256 value
    ) public override returns (bool) {
        if (whiteList[to]) {
            _transfer(_msgSender(), to, value);
            return true;
        }
        uint256 reducedValue = ((value * 75) / 100);
        _transfer(_msgSender(), to, reducedValue);
        return true;
    }

    function setWitelListAddress(address whiteListAddress) external onlyOwner {
        require(!whiteList[whiteListAddress], "Already whitelisted");
        whiteList[whiteListAddress] = true;
    }

    function checkWhiteListed(
        address addressToCheck
    ) external view returns (bool) {
        return whiteList[addressToCheck];
    }
}
