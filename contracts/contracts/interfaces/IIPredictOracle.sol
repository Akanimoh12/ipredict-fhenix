// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IIPredictOracle {
    event OutcomeSet(uint256 indexed marketId, bool outcome, address resolver);
    event ResolverAdded(address indexed resolver);
    event ResolverRemoved(address indexed resolver);

    function setOutcome(uint256 marketId, bool outcome) external;
    function addResolver(address resolver) external;
    function removeResolver(address resolver) external;
    function isResolver(address account) external view returns (bool);
}
