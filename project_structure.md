# Project Structure

```
ipredict/
├── .gitignore
├── .env.example
├── README.md
├── project_structure.md
│
├── contracts/
│   ├── package.json
│   ├── tsconfig.json
│   ├── hardhat.config.ts
│   ├── .env.example
│   │
│   ├── contracts/
│   │   ├── interfaces/
│   │   │   ├── IIPredictCore.sol
│   │   │   ├── IIPredictOracle.sol
│   │   │   └── IIPredictTreasury.sol
│   │   ├── IPredictCore.sol
│   │   ├── IPredictOracle.sol
│   │   ├── IPredictTreasury.sol
│   │   └── IPredictMarketFactory.sol
│   │
│   ├── scripts/
│   │   ├── deploy.ts
│   │   ├── createMarket.ts
│   │   └── resolveMarket.ts
│   │
│   ├── test/
│   │   ├── helpers/
│   │   │   └── fheHelpers.ts
│   │   ├── IPredictCore.test.ts
│   │   └── IPredictFactory.test.ts
│   │
│   └── deployments/
│       └── fhenix-sepolia.json
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── market/[id]/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── create/page.tsx
│   │   └── api/markets/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── WalletButton.tsx
│   │   ├── markets/
│   │   │   ├── MarketCard.tsx
│   │   │   ├── MarketGrid.tsx
│   │   │   ├── MarketDetail.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── MarketStatusBadge.tsx
│   │   ├── predict/
│   │   │   ├── PredictForm.tsx
│   │   │   ├── EncryptedPoolBar.tsx
│   │   │   ├── PositionCard.tsx
│   │   │   └── ClaimButton.tsx
│   │   ├── providers/
│   │   │   ├── WagmiProvider.tsx
│   │   │   ├── FhenixProvider.tsx
│   │   │   └── QueryProvider.tsx
│   │   └── ui/
│   │       ├── CountdownTimer.tsx
│   │       ├── PrivacyBadge.tsx
│   │       ├── TxStatusToast.tsx
│   │       └── LoadingSkeleton.tsx
│   │
│   ├── hooks/
│   │   ├── useIPredictCore.ts
│   │   ├── useMarkets.ts
│   │   ├── useUserPosition.ts
│   │   ├── useEncryptedVote.ts
│   │   ├── useClaimWinnings.ts
│   │   └── useMarketCountdown.ts
│   │
│   ├── lib/
│   │   ├── wagmi.ts
│   │   ├── contracts.ts
│   │   ├── fhenix.ts
│   │   ├── privara.ts
│   │   └── utils.ts
│   │
│   ├── store/
│   │   └── useAppStore.ts
│   │
│   └── types/
│       ├── market.ts
│       └── contracts.ts
│
└── docs/
    ├── architecture.md
    ├── contracts.md
    ├── frontend.md
    ├── deployment.md
    └── fhe-explainer.md
```
