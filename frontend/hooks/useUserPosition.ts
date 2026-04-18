"use client";

import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import type { UserPosition } from "@/types/market";

export function useUserPosition(marketId: bigint, userAddress?: string) {
  const { data, isLoading, error: readError } = useReadContract({
    ...CONTRACTS.core,
    functionName: "getUserPosition",
    args: userAddress ? [marketId, userAddress as `0x${string}`] : undefined,
    query: { enabled: !!userAddress },
  });

  // getUserPosition returns (bytes32 yesHandle, bytes32 noHandle)
  // Handles are opaque FHE ciphertext refs; we show whether a position exists
  const position: UserPosition | null = data
    ? {
        yesAmount: (data as [string, string])[0] !== "0x" + "0".repeat(64) ? 1 : 0,
        noAmount: (data as [string, string])[1] !== "0x" + "0".repeat(64) ? 1 : 0,
      }
    : null;

  return {
    position,
    loading: isLoading,
    error: readError ? readError.message : null,
    fetchPosition: () => {},
  };
}
