// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {InEuint32} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

interface IIPredictCore {
    enum MarketStatus { Open, Locked, Resolved }

    struct MarketView {
        uint256 id;
        string question;
        string category;
        uint256 deadline;
        uint256 resolutionTime;
        address creator;
        MarketStatus status;
        bool outcome;
        uint256 publicTotalPool;
    }

    event MarketCreated(uint256 indexed marketId, string question, string category, uint256 deadline, address creator);
    event PredictionPlaced(uint256 indexed marketId, address indexed user, bool isYes, uint256 publicAmount);
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event WinningsClaimed(uint256 indexed marketId, address indexed user, uint256 payout);
    event ClaimPrepared(uint256 indexed marketId, address indexed user);

    function createMarket(string calldata question, string calldata category, uint256 deadline) external returns (uint256 marketId);
    function predict(uint256 marketId, InEuint32 memory encryptedAmount, bool isYes) external payable;
    function resolveMarket(uint256 marketId, bool outcome) external;
    function claimWinnings(uint256 marketId, uint32 decryptedStake, bytes memory stakeSignature, uint32 totalWinPool, bytes memory winPoolSignature, uint32 totalLosePool, bytes memory losePoolSignature) external;
    function getMarket(uint256 marketId) external view returns (MarketView memory);
    function getUserPosition(uint256 marketId, address user) external view returns (bytes32 yesHandle, bytes32 noHandle);
    function getMarketsByCategory(string calldata category) external view returns (uint256[] memory);
    function getMarketCount() external view returns (uint256);
}
