// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FHE, euint32, InEuint32} from "@fhenixprotocol/cofhe-contracts/FHE.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IIPredictCore} from "./interfaces/IIPredictCore.sol";
import {IIPredictTreasury} from "./interfaces/IIPredictTreasury.sol";

contract IPredictCore is IIPredictCore, Ownable, ReentrancyGuard {
    struct Market {
        uint256 id;
        string question;
        string category;
        uint256 deadline;
        uint256 resolutionTime;
        address creator;
        MarketStatus status;
        bool outcome;
        euint32 totalYesPool;
        euint32 totalNoPool;
        uint256 publicTotalPool;
    }

    struct Position {
        euint32 yesAmount;
        euint32 noAmount;
        bool claimed;
    }

    struct ClaimRequest {
        bool prepared;
        euint32 userStake;
        euint32 totalWinPool;
        euint32 totalLosePool;
    }

    uint256 public marketCount;
    uint256 public constant FEE_BPS = 100; // 1%
    uint256 public constant BPS_DENOMINATOR = 10000;
    uint256 public constant RESOLUTION_BUFFER = 1 hours;

    address public oracle;
    address public treasury;

    mapping(uint256 => Market) private _markets;
    mapping(uint256 => mapping(address => Position)) private _positions;
    mapping(string => uint256[]) private _categoryMarkets;
    mapping(uint256 => mapping(address => ClaimRequest)) private _claimRequests;

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle");
        _;
    }

    constructor(address _treasury, address _oracle) Ownable(msg.sender) {
        require(_treasury != address(0), "Invalid treasury");
        require(_oracle != address(0), "Invalid oracle");
        treasury = _treasury;
        oracle = _oracle;
    }

    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle");
        oracle = _oracle;
    }

    function createMarket(
        string calldata question,
        string calldata category,
        uint256 deadline
    ) external override returns (uint256 marketId) {
        require(bytes(question).length > 0, "Empty question");
        require(bytes(category).length > 0, "Empty category");
        require(deadline > block.timestamp, "Deadline must be future");

        marketId = marketCount;
        marketCount++;

        Market storage m = _markets[marketId];
        m.id = marketId;
        m.question = question;
        m.category = category;
        m.deadline = deadline;
        m.resolutionTime = deadline + RESOLUTION_BUFFER;
        m.creator = msg.sender;
        m.status = MarketStatus.Open;
        m.publicTotalPool = 0;

        _categoryMarkets[category].push(marketId);

        emit MarketCreated(marketId, question, category, deadline, msg.sender);
    }

    function predict(
        uint256 marketId,
        InEuint32 memory encryptedAmount,
        bool isYes
    ) external payable override {
        Market storage m = _markets[marketId];
        require(m.status == MarketStatus.Open, "Market not open");
        require(block.timestamp < m.deadline, "Market expired");
        require(msg.value > 0, "Must send value");

        euint32 amount = FHE.asEuint32(encryptedAmount);

        Position storage pos = _positions[marketId][msg.sender];

        if (isYes) {
            m.totalYesPool = FHE.add(m.totalYesPool, amount);
            pos.yesAmount = FHE.add(pos.yesAmount, amount);
            FHE.allowThis(m.totalYesPool);
            FHE.allowThis(pos.yesAmount);
        } else {
            m.totalNoPool = FHE.add(m.totalNoPool, amount);
            pos.noAmount = FHE.add(pos.noAmount, amount);
            FHE.allowThis(m.totalNoPool);
            FHE.allowThis(pos.noAmount);
        }

        FHE.allowSender(amount);
        m.publicTotalPool += msg.value;

        emit PredictionPlaced(marketId, msg.sender, isYes, msg.value);
    }

    function resolveMarket(uint256 marketId, bool outcome) external override onlyOracle {
        Market storage m = _markets[marketId];
        require(m.status == MarketStatus.Open, "Market not open");
        require(block.timestamp >= m.resolutionTime, "Too early to resolve");

        m.status = MarketStatus.Resolved;
        m.outcome = outcome;

        FHE.allowPublic(m.totalYesPool);
        FHE.allowPublic(m.totalNoPool);

        emit MarketResolved(marketId, outcome);
    }

    function prepareClaim(uint256 marketId) external {
        Market storage m = _markets[marketId];
        require(m.status == MarketStatus.Resolved, "Market not resolved");

        Position storage pos = _positions[marketId][msg.sender];
        require(!pos.claimed, "Already claimed");

        ClaimRequest storage cr = _claimRequests[marketId][msg.sender];
        require(!cr.prepared, "Already prepared");

        euint32 userStake;
        if (m.outcome) {
            userStake = pos.yesAmount;
        } else {
            userStake = pos.noAmount;
        }

        cr.prepared = true;
        cr.userStake = userStake;
        if (m.outcome) {
            cr.totalWinPool = m.totalYesPool;
            cr.totalLosePool = m.totalNoPool;
        } else {
            cr.totalWinPool = m.totalNoPool;
            cr.totalLosePool = m.totalYesPool;
        }

        FHE.allowPublic(userStake);

        emit ClaimPrepared(marketId, msg.sender);
    }

    function claimWinnings(
        uint256 marketId,
        uint32 decryptedStake,
        bytes memory stakeSignature,
        uint32 totalWinPool,
        bytes memory winPoolSignature,
        uint32 totalLosePool,
        bytes memory losePoolSignature
    ) external override nonReentrant {
        Market storage m = _markets[marketId];
        require(m.status == MarketStatus.Resolved, "Market not resolved");

        Position storage pos = _positions[marketId][msg.sender];
        require(!pos.claimed, "Already claimed");

        ClaimRequest storage cr = _claimRequests[marketId][msg.sender];
        require(cr.prepared, "Must call prepareClaim first");

        FHE.verifyDecryptResult(cr.userStake, decryptedStake, stakeSignature);
        FHE.verifyDecryptResult(cr.totalWinPool, totalWinPool, winPoolSignature);
        FHE.verifyDecryptResult(cr.totalLosePool, totalLosePool, losePoolSignature);

        pos.claimed = true;
        delete _claimRequests[marketId][msg.sender];

        require(decryptedStake > 0, "No winning position");
        require(totalWinPool > 0, "No winners");

        uint256 winnings = uint256(decryptedStake) +
            (uint256(decryptedStake) * uint256(totalLosePool)) / uint256(totalWinPool);

        uint256 fee = (winnings * FEE_BPS) / BPS_DENOMINATOR;
        uint256 payout = winnings - fee;

        if (fee > 0) {
            IIPredictTreasury(treasury).receiveFees{value: fee}(address(0), fee, marketId);
        }

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");

        emit WinningsClaimed(marketId, msg.sender, payout);
    }

    function getMarket(uint256 marketId) external view override returns (MarketView memory) {
        Market storage m = _markets[marketId];
        return MarketView({
            id: m.id,
            question: m.question,
            category: m.category,
            deadline: m.deadline,
            resolutionTime: m.resolutionTime,
            creator: m.creator,
            status: m.status,
            outcome: m.outcome,
            publicTotalPool: m.publicTotalPool
        });
    }

    function getUserPosition(
        uint256 marketId,
        address user
    ) external view override returns (bytes32 yesHandle, bytes32 noHandle) {
        Position storage pos = _positions[marketId][user];
        yesHandle = FHE.unwrap(pos.yesAmount);
        noHandle = FHE.unwrap(pos.noAmount);
    }

    function getMarketsByCategory(string calldata category) external view override returns (uint256[] memory) {
        return _categoryMarkets[category];
    }

    function getMarketCount() external view override returns (uint256) {
        return marketCount;
    }
}
