"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import type { MarketView } from "@/types/market";

export function useMarketCount() {
  return useReadContract({
    ...CONTRACTS.core,
    functionName: "getMarketCount",
  });
}

export function useMarket(marketId: bigint) {
  return useReadContract({
    ...CONTRACTS.core,
    functionName: "getMarket",
    args: [marketId],
  });
}

export function useMarketsByCategory(category: string) {
  return useReadContract({
    ...CONTRACTS.core,
    functionName: "getMarketsByCategory",
    args: [category],
    query: { enabled: !!category },
  });
}

export function useCreateMarket() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createMarket = (question: string, category: string, deadline: bigint) => {
    writeContract({
      ...CONTRACTS.core,
      functionName: "createMarket",
      args: [question, category, deadline],
    });
  };

  return { createMarket, hash, isPending, isConfirming, isSuccess, error };
}

export function usePredict() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const predict = (
    marketId: bigint,
    encryptedAmount: {
      hash: `0x${string}`;
      utype: number;
      securityZone: number;
      signature: `0x${string}`;
    },
    isYes: boolean,
    value: bigint
  ) => {
    writeContract({
      ...CONTRACTS.core,
      functionName: "predict",
      args: [marketId, encryptedAmount, isYes],
      value,
    });
  };

  return { predict, hash, isPending, isConfirming, isSuccess, error };
}

export function usePrepareClaim() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const prepareClaim = (marketId: bigint) => {
    writeContract({
      ...CONTRACTS.core,
      functionName: "prepareClaim",
      args: [marketId],
    });
  };

  return { prepareClaim, hash, isPending, isConfirming, isSuccess, error };
}

export function useClaimWinningsWrite() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claim = (
    marketId: bigint,
    decryptedStake: number,
    stakeSignature: `0x${string}`,
    totalWinPool: number,
    winPoolSignature: `0x${string}`,
    totalLosePool: number,
    losePoolSignature: `0x${string}`
  ) => {
    writeContract({
      ...CONTRACTS.core,
      functionName: "claimWinnings",
      args: [
        marketId,
        decryptedStake,
        stakeSignature,
        totalWinPool,
        winPoolSignature,
        totalLosePool,
        losePoolSignature,
      ],
    });
  };

  return { claim, hash, isPending, isConfirming, isSuccess, error };
}
