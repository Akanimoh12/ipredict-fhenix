"use client";

import { MarketCard } from "./MarketCard";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";
import { RiSearchLine } from "react-icons/ri";
import type { MarketView } from "@/types/market";

interface MarketGridProps {
  markets: MarketView[];
  loading?: boolean;
}

export function MarketGrid({ markets, loading }: MarketGridProps) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (markets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <RiSearchLine className="mb-3 h-8 w-8 text-gray-600" />
        <p className="text-sm">No markets found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {markets.map((market) => (
        <MarketCard key={market.id.toString()} market={market} />
      ))}
    </div>
  );
}
