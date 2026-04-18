# 🔮 iPredict

**Your bets. Encrypted. Always.**

iPredict is a prediction market where nobody knows how much you wagered — not the validators, not the whales, not even the contract owner. Built on [Fhenix CoFHE](https://fhenix.io), every stake is fully homomorphically encrypted before it hits the chain.

---

## What makes this different?

On regular prediction markets, your bet size is public. Whales front-run you. MEV bots sandwich you. Your portfolio is an open book.

**iPredict flips the script.**

- 🔐 **Encrypted stakes** — Your bet amount is encrypted client-side with FHE. The contract adds ciphertexts together without ever seeing plaintext.
- 👁️ **No peeking** — The YES/NO pool split is hidden until the market resolves. No one can game the odds by watching bet flows.
- 🧮 **Math, not trust** — Privacy enforced by Fully Homomorphic Encryption, not promises or mixers.
- 💸 **Fair payouts** — Winners claim proportional rewards, with a tiny 1% fee to keep the lights on.

## Deployed Contracts (Ethereum Sepolia)

| Contract | Address |
|----------|---------|
| IPredictTreasury | [`0xEb58d7c02Cd76bcD6Aa5609Cf798e1AdF0f7805A`](https://sepolia.etherscan.io/address/0xEb58d7c02Cd76bcD6Aa5609Cf798e1AdF0f7805A) |
| IPredictOracle | [`0x77ec0037Bf4928BeaC8Cb943D249b0045209C464`](https://sepolia.etherscan.io/address/0x77ec0037Bf4928BeaC8Cb943D249b0045209C464) |
| IPredictCore | [`0x6C28363C60Ff3bcc509eeA37Cce473B919947b9C`](https://sepolia.etherscan.io/address/0x6C28363C60Ff3bcc509eeA37Cce473B919947b9C) |
| IPredictMarketFactory | [`0x7c13D90950F542B297179e09f3A36EaA917A40C1`](https://sepolia.etherscan.io/address/0x7c13D90950F542B297179e09f3A36EaA917A40C1) |

- **Chain**: Ethereum Sepolia (Chain ID: 11155111)
- **Explorer**: [sepolia.etherscan.io](https://sepolia.etherscan.io)

## Links

- **Website**: [https://ipredict-fhenix.vercel.app](https://ipredict-fhenix.vercel.app)
- **Demo Video**: [Watch on Loom](https://loom.com)

## Quick Start

```bash
# contracts
cd contracts
npm install
npx hardhat compile
npx hardhat test

# frontend
cd ../frontend
npm install
npm run dev
# → opens at http://localhost:3000
```

## How it works

1. Pick a market — "Will ETH hit $10k by December?"
2. Choose YES or NO
3. Enter your stake — it gets encrypted with FHE before submission
4. Wait for resolution
5. Winners claim their encrypted winnings via a two-step process (prepareClaim → claimWinnings)

The pool total (in ETH) is public so you know there's real money at stake. But individual positions? Those are locked in the FHE vault.

## Tech Stack

| Layer | Tech |
|-------|------|
| Encryption | Fhenix CoFHE (`euint32`, `FHE.asEuint32`, `FHE.allowPublic`) |
| Contracts | Solidity 0.8.28, Hardhat, OpenZeppelin v5 |
| Frontend | Next.js 14, wagmi v2, RainbowKit, Tailwind CSS |
| State | zustand + TanStack Query |

## Project Structure

```
ipredict-fhenix/
├── contracts/          # Solidity contracts + Hardhat
│   ├── contracts/      # IPredictCore, Oracle, Treasury, Factory
│   ├── scripts/        # Deploy, seed markets, resolve
│   └── test/           # Hardhat tests
├── frontend/           # Next.js 14 App Router
│   ├── app/            # Pages
│   ├── components/     # UI components
│   ├── hooks/          # Contract interaction hooks
│   └── lib/            # Config, ABIs, FHE helpers
└── docs/               # Architecture, contracts, FHE explainer
```

## License

MIT

---

*Built with 🔐 on Fhenix CoFHE — where your predictions stay private.*
