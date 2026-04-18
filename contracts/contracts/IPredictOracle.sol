// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IIPredictOracle} from "./interfaces/IIPredictOracle.sol";
import {IIPredictCore} from "./interfaces/IIPredictCore.sol";

contract IPredictOracle is IIPredictOracle, Ownable {
    mapping(address => bool) private _resolvers;
    address public coreContract;

    modifier onlyResolver() {
        require(_resolvers[msg.sender], "Not authorized resolver");
        _;
    }

    constructor() Ownable(msg.sender) {
        _resolvers[msg.sender] = true;
    }

    function setCoreContract(address _core) external onlyOwner {
        require(_core != address(0), "Invalid core address");
        coreContract = _core;
    }

    function setOutcome(uint256 marketId, bool outcome) external override onlyResolver {
        require(coreContract != address(0), "Core not set");
        IIPredictCore(coreContract).resolveMarket(marketId, outcome);
        emit OutcomeSet(marketId, outcome, msg.sender);
    }

    function addResolver(address resolver) external override onlyOwner {
        require(resolver != address(0), "Invalid resolver");
        _resolvers[resolver] = true;
        emit ResolverAdded(resolver);
    }

    function removeResolver(address resolver) external override onlyOwner {
        require(resolver != address(0), "Invalid resolver");
        _resolvers[resolver] = false;
        emit ResolverRemoved(resolver);
    }

    function isResolver(address account) external view override returns (bool) {
        return _resolvers[account];
    }
}
