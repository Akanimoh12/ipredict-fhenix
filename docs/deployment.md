# Deployment

## Prerequisites

- Node.js 18+
- A Fhenix Sepolia wallet with tFHE tokens
- RPC endpoint (default: `https://api.helios.fhenix.zone`)

## Contracts

```bash
cd contracts
cp .env.example .env
# fill in DEPLOYER_PRIVATE_KEY

npm install
npx hardhat compile
npx hardhat test

# deploy to Fhenix Sepolia
npx hardhat run scripts/deploy.ts --network fhenixSepolia

# seed demo markets
npx hardhat run scripts/createMarket.ts --network fhenixSepolia
```

The deploy script writes addresses to `deployments/fhenix-sepolia.json`.

## Frontend

```bash
cd frontend
cp ../.env.example .env.local
# fill in NEXT_PUBLIC_CORE_ADDRESS, NEXT_PUBLIC_FACTORY_ADDRESS, NEXT_PUBLIC_WALLETCONNECT_ID

npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DEPLOYER_PRIVATE_KEY` | Wallet private key for contract deployment |
| `FHENIX_SEPOLIA_RPC` | Fhenix Sepolia RPC URL |
| `NEXT_PUBLIC_CORE_ADDRESS` | Deployed IPredictCore address |
| `NEXT_PUBLIC_FACTORY_ADDRESS` | Deployed IPredictMarketFactory address |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | WalletConnect project ID |
