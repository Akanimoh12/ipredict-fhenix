export enum MarketStatus {
  Open = 0,
  Locked = 1,
  Resolved = 2,
}

export interface MarketView {
  id: bigint;
  question: string;
  category: string;
  deadline: bigint;
  resolutionTime: bigint;
  creator: string;
  status: MarketStatus;
  outcome: boolean;
  publicTotalPool: bigint;
}

export interface UserPosition {
  yesAmount: number;
  noAmount: number;
}

export interface MarketCategory {
  name: string;
  icon: string;
  count: number;
}

export const CATEGORIES: MarketCategory[] = [
  { name: "Crypto", icon: "🔐", count: 0 },
  { name: "Sports", icon: "⚽", count: 0 },
  { name: "Tech", icon: "💻", count: 0 },
  { name: "Politics", icon: "🏛️", count: 0 },
  { name: "Pop Culture", icon: "🎬", count: 0 },
];
