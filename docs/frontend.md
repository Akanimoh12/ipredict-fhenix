# Frontend

## Stack

- **Next.js 14** (App Router)
- **wagmi v2** + **viem v2** for contract interaction
- **RainbowKit v2** for wallet connection
- **TanStack Query v5** for async state
- **Tailwind CSS v3** for styling
- **Framer Motion** for animations
- **zustand** for client state
- **@fhenixprotocol/cofhe-sdk** for FHE encryption

## Structure

```
frontend/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # Navbar, Footer, WalletButton
│   ├── markets/      # MarketCard, MarketGrid, MarketDetail
│   ├── predict/      # PredictForm, EncryptedPoolBar, ClaimButton
│   ├── providers/    # WagmiProvider, FhenixProvider, QueryProvider
│   └── ui/           # CountdownTimer, PrivacyBadge, TxStatusToast
├── hooks/            # Custom React hooks for contract reads/writes
├── lib/              # wagmi config, contract ABIs, FHE helpers
├── store/            # zustand store
└── types/            # TypeScript interfaces
```

## Key Patterns

### Encrypted Voting

1. User enters stake amount in the UI
2. `encryptAmount()` calls CoFHE SDK to produce encrypted bytes
3. Encrypted bytes sent as calldata to `predict()` with ETH value
4. Pool bar shows 50/50 placeholder since true split is hidden

### FHE Permissions

Viewing your own position requires an FHE permit — a signed message proving wallet ownership. The `generatePermission()` function handles this via the CoFHE SDK.
