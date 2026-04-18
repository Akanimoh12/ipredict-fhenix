// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IIPredictTreasury} from "./interfaces/IIPredictTreasury.sol";

contract IPredictTreasury is IIPredictTreasury, Ownable {
    mapping(address => uint256) private _balances;

    // address(0) represents native token
    address public constant NATIVE_TOKEN = address(0);

    constructor() Ownable(msg.sender) {}

    receive() external payable {
        _balances[NATIVE_TOKEN] += msg.value;
    }

    function receiveFees(address token, uint256 amount, uint256 marketId) external payable override {
        if (token == NATIVE_TOKEN) {
            require(msg.value == amount, "Invalid ETH amount");
            _balances[NATIVE_TOKEN] += amount;
        } else {
            _balances[token] += amount;
        }
        emit FeesReceived(token, amount, marketId);
    }

    function withdrawFees(address token, uint256 amount) external override onlyOwner {
        require(_balances[token] >= amount, "Insufficient balance");
        _balances[token] -= amount;

        if (token == NATIVE_TOKEN) {
            (bool success, ) = payable(owner()).call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            (bool success, bytes memory data) = token.call(
                abi.encodeWithSignature("transfer(address,uint256)", owner(), amount)
            );
            require(success && (data.length == 0 || abi.decode(data, (bool))), "Token transfer failed");
        }

        emit FeesWithdrawn(token, amount, owner());
    }

    function getBalance(address token) external view override returns (uint256) {
        return _balances[token];
    }
}
