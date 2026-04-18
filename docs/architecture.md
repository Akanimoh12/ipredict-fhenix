# Architecture

## System Overview

iPredict is a privacy-native prediction market dApp built on Fhenix, using Fully Homomorphic Encryption (FHE) to keep individual stakes hidden from all observers, including validators and other users.

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│   Next.js 14 + wagmi + RainbowKit + CoFHE   │
└──────────────────┬──────────────────────────┘
                   │ encrypted tx
┌──────────────────▼──────────────────────────┐
│              Fhenix Blockchain               │
│                                              │
│  ┌──────────────┐  ┌─────────────────────┐  │
│  │ MarketFactory│──│    IPredictCore      │  │
│  └──────────────┘  │  (FHE stakes)       │  │
│                    └─────────┬────────────┘  │
│                              │               │
│              ┌───────────────┼────────────┐  │
│              │               │            │  │
│  ┌───────────▼──┐  ┌────────▼─────────┐  │  │
│  │IPredictOracle│  │IPredictTreasury   │  │  │
│  │  (resolver)  │  │  (fee collection) │  │  │
│  └──────────────┘  └──────────────────┘  │  │
│                                          │  │
└──────────────────────────────────────────┘  │
```

## Data Flow

1. User encrypts stake amount client-side using CoFHE SDK
2. Encrypted bytes sent to `IPredictCore.predict()` with native ETH
3. FHE operations add encrypted amounts to pool totals on-chain
4. No one can see individual stakes — only the total ETH in the pool is public
5. After resolution, winners claim via FHE-decrypted proportional payout

## Contract Relationships

- **IPredictCore**: Main logic — markets, predictions, claims
- **IPredictMarketFactory**: Registry + delegated market creation
- **IPredictOracle**: Authorized resolvers set market outcomes
- **IPredictTreasury**: Collects 1% fee on winning claims
