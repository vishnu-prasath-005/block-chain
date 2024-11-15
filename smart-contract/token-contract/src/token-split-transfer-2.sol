// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenVP3 is ERC20 {
    address private wallettC;

    constructor(address accountC) ERC20("vishnu3", "VP3") {
        _mint(msg.sender, (2000000 * (10 ** uint256(decimals()))));
        address[2] memory testAccount = [
            0xaefA79B686dCD5e1FE83FDdba6457DB1e7f2cd32,
            0xc77BEDAe5186f4642e326721dEE6f9D15985E7A2
        ];

        wallettC = accountC;

        for (uint256 i = 0; i < testAccount.length; i++) {
            _transfer(_msgSender(), testAccount[i], totalSupply() / 2);
        }
    }

    function transfer(
        address to,
        uint256 value
    ) public override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, _splitTransfer(50, value));
        _transfer(owner, wallettC, _splitTransfer(50, value));
        return true;
    }

    function _splitTransfer(
        uint percentageToSplit,
        uint amount
    ) internal pure returns (uint) {
        return amount - ((amount * percentageToSplit) / 100);
    }

    function getWalletCBalance() external view returns (uint256) {
        return balanceOf(wallettC);
    }
}
