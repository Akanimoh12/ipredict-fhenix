// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IPredictCore} from "./IPredictCore.sol";

contract IPredictMarketFactory is Ownable {
    event MarketDeployed(uint256 indexed marketId, address core);

    address public coreContract;
    mapping(uint256 => address) public marketCoreRegistry;
    uint256[] public deployedMarketIds;

    constructor(address _core) Ownable(msg.sender) {
        require(_core != address(0), "Invalid core");
        coreContract = _core;
    }

    function createMarket(
        string calldata question,
        string calldata category,
        uint256 deadline
    ) external returns (uint256 marketId) {
        marketId = IPredictCore(coreContract).createMarket(question, category, deadline);
        marketCoreRegistry[marketId] = coreContract;
        deployedMarketIds.push(marketId);
        emit MarketDeployed(marketId, coreContract);
    }

    function setCoreContract(address _core) external onlyOwner {
        require(_core != address(0), "Invalid core");
        coreContract = _core;
    }

    function getDeployedMarkets() external view returns (uint256[] memory) {
        return deployedMarketIds;
    }

    function getCoreForMarket(uint256 marketId) external view returns (address) {
        return marketCoreRegistry[marketId];
    }
}
