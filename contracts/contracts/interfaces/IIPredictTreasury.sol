// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IIPredictTreasury {
    event FeesReceived(address indexed token, uint256 amount, uint256 marketId);
    event FeesWithdrawn(address indexed token, uint256 amount, address indexed to);

    function receiveFees(address token, uint256 amount, uint256 marketId) external payable;
    function withdrawFees(address token, uint256 amount) external;
    function getBalance(address token) external view returns (uint256);
}
