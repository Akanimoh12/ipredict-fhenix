export const IPREDICT_CORE_ABI = [
  {
    type: "function",
    name: "createMarket",
    inputs: [
      { name: "question", type: "string" },
      { name: "category", type: "string" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "marketId", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "predict",
    inputs: [
      { name: "marketId", type: "uint256" },
      {
        name: "encryptedAmount",
        type: "tuple",
        components: [
          { name: "hash", type: "bytes32" },
          { name: "utype", type: "uint8" },
          { name: "securityZone", type: "int32" },
          { name: "signature", type: "bytes" },
        ],
      },
      { name: "isYes", type: "bool" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "resolveMarket",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "outcome", type: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimWinnings",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "decryptedStake", type: "uint32" },
      { name: "stakeSignature", type: "bytes" },
      { name: "totalWinPool", type: "uint32" },
      { name: "winPoolSignature", type: "bytes" },
      { name: "totalLosePool", type: "uint32" },
      { name: "losePoolSignature", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMarket",
    inputs: [{ name: "marketId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "question", type: "string" },
          { name: "category", type: "string" },
          { name: "deadline", type: "uint256" },
          { name: "resolutionTime", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "status", type: "uint8" },
          { name: "outcome", type: "bool" },
          { name: "publicTotalPool", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserPosition",
    inputs: [
      { name: "marketId", type: "uint256" },
      { name: "user", type: "address" },
    ],
    outputs: [
      { name: "yesHandle", type: "bytes32" },
      { name: "noHandle", type: "bytes32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketsByCategory",
    inputs: [{ name: "category", type: "string" }],
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "MarketCreated",
    inputs: [
      { name: "marketId", type: "uint256", indexed: true },
      { name: "question", type: "string", indexed: false },
      { name: "category", type: "string", indexed: false },
      { name: "deadline", type: "uint256", indexed: false },
      { name: "creator", type: "address", indexed: false },
    ],
  },
  {
    type: "event",
    name: "PredictionPlaced",
    inputs: [
      { name: "marketId", type: "uint256", indexed: true },
      { name: "user", type: "address", indexed: true },
      { name: "isYes", type: "bool", indexed: false },
      { name: "publicAmount", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "MarketResolved",
    inputs: [
      { name: "marketId", type: "uint256", indexed: true },
      { name: "outcome", type: "bool", indexed: false },
    ],
  },
  {
    type: "event",
    name: "WinningsClaimed",
    inputs: [
      { name: "marketId", type: "uint256", indexed: true },
      { name: "user", type: "address", indexed: true },
      { name: "payout", type: "uint256", indexed: false },
    ],
  },
  {
    type: "function",
    name: "prepareClaim",
    inputs: [{ name: "marketId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ClaimPrepared",
    inputs: [
      { name: "marketId", type: "uint256", indexed: true },
      { name: "user", type: "address", indexed: true },
    ],
  },
] as const;

export const IPREDICT_FACTORY_ABI = [
  {
    type: "function",
    name: "createMarket",
    inputs: [
      { name: "question", type: "string" },
      { name: "category", type: "string" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "marketId", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDeployedMarkets",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCoreForMarket",
    inputs: [{ name: "marketId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const;

export const CONTRACTS = {
  core: {
    address: (process.env.NEXT_PUBLIC_CORE_ADDRESS || "0x") as `0x${string}`,
    abi: IPREDICT_CORE_ABI,
  },
  factory: {
    address: (process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x") as `0x${string}`,
    abi: IPREDICT_FACTORY_ABI,
  },
} as const;
