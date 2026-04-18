"use client";

import { useMemo } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import type { MarketView } from "@/types/market";

export function useMarkets() {
  const { data: count, isLoading: countLoading } = useReadContract({
    ...CONTRACTS.core,
    functionName: "getMarketCount",
    query: { refetchInterval: 10_000 },
  });

  const total = count !== undefined ? Number(count) : 0;

  const contracts = useMemo(() => {
    if (total === 0) return [];
    return Array.from({ length: total }, (_, i) => ({
      ...CONTRACTS.core,
      functionName: "getMarket" as const,
      args: [BigInt(i)] as const,
    }));
  }, [total]);

  const { data: results, isLoading: marketsLoading } = useReadContracts({
    contracts,
    query: {
      enabled: total > 0,
      refetchInterval: 10_000,
    },
  });

  const markets: MarketView[] = useMemo(() => {
    if (!results) return [];
    return results
      .filter((r) => r.status === "success" && r.result)
      .map((r) => {
        const m = r.result as {
          id: bigint;
          question: string;
          category: string;
          deadline: bigint;
          resolutionTime: bigint;
          creator: string;
          status: number;
          outcome: boolean;
          publicTotalPool: bigint;
        };
        return {
          id: m.id,
          question: m.question,
          category: m.category,
          deadline: m.deadline,
          resolutionTime: m.resolutionTime,
          creator: m.creator,
          status: m.status,
          outcome: m.outcome,
          publicTotalPool: m.publicTotalPool,
        };
      });
  }, [results]);

  return {
    markets,
    loading: countLoading || (total > 0 && marketsLoading),
    count: total,
  };
}

export function useFilteredMarkets(category: string | null) {
  const { data: ids } = useReadContract({
    ...CONTRACTS.core,
    functionName: "getMarketsByCategory",
    args: category ? [category] : undefined,
    query: { enabled: !!category },
  });

  return { marketIds: ids as bigint[] | undefined };
}
