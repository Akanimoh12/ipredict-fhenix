# Smart Contracts

## Overview

All contracts target Solidity ^0.8.24 and use Fhenix FHE primitives (`euint32`, `inEuint32`, `FHE.add`, `FHE.decrypt`).

## IPredictCore

The core contract holds all market state and encrypted positions.

### Key Functions

| Function | Access | Description |
|----------|--------|-------------|
| `createMarket(question, category, deadline)` | Public | Creates a new binary market |
| `predict(marketId, encryptedAmount, isYes)` | Public + payable | Submit encrypted YES/NO prediction |
| `resolveMarket(marketId, outcome)` | Oracle only | Set final outcome after deadline + buffer |
| `claimWinnings(marketId, permission)` | Winner + permit | Decrypt stake, calculate payout, send ETH |
| `getMarket(marketId)` | View | Returns public market data |
| `getUserPosition(marketId, permission)` | View + permit | Decrypts user's position |

### FHE Flow in predict()

```
User input: bytes calldata encryptedAmount
→ inEuint32{data: encryptedAmount, securityZone: 0}
→ FHE.asEuint32(inputAmount) → euint32
→ FHE.add(pool, amount)
```

### Fee Structure

- 1% fee (100 BPS) deducted from winning claims
- Fees sent to IPredictTreasury via `receiveFees()`

## IPredictOracle

Manages authorized resolvers who can set market outcomes.

## IPredictTreasury

Holds collected fees. Owner can withdraw. Supports native ETH.

## IPredictMarketFactory

Registry pattern — delegates `createMarket` to Core and tracks market-to-core mappings.
