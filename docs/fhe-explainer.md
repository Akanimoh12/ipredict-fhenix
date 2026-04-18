# FHE Explainer

## What is Fully Homomorphic Encryption?

FHE lets you compute on encrypted data without decrypting it first. The blockchain processes encrypted numbers without ever seeing the actual values.

## How iPredict Uses FHE

### The Problem
In traditional prediction markets, everyone can see how much each person bets on each side. This creates front-running, manipulation, and privacy leakage.

### The Solution
With Fhenix FHE:

1. **Encrypt**: Your stake amount is encrypted client-side before it ever touches the blockchain
2. **Compute**: The contract adds your encrypted stake to the encrypted pool total using `FHE.add()` — this happens on ciphertext, not plaintext
3. **Hide**: Nobody — not validators, not other users, not even the contract owner — can see individual bet sizes
4. **Reveal**: Only at claim time, the winner's stake is decrypted to calculate their proportional payout

### FHE Types Used

| Type | Description |
|------|-------------|
| `euint32` | Encrypted unsigned 32-bit integer (stored as uint256 on-chain) |
| `inEuint32` | Input struct with encrypted bytes + security zone |

### FHE Operations

| Operation | What It Does |
|-----------|-------------|
| `FHE.asEuint32(input)` | Convert encrypted input to FHE type |
| `FHE.add(a, b)` | Add two encrypted values |
| `FHE.decrypt(value)` | Decrypt (only callable by authorized contracts) |

### Security Zones

Fhenix uses security zones (default: 0) to isolate encrypted data domains. All iPredict operations use zone 0.

## Why This Matters

- No front-running: attackers can't see your bet size to copy or counter it
- No social pressure: your positions are private
- Fair markets: the pool split is hidden until resolution
- Trustless privacy: enforced by math, not policy
