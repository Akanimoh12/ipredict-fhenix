"use client";

import { CategoryFilter } from "@/components/markets/CategoryFilter";
import { MarketGrid } from "@/components/markets/MarketGrid";
import { useMarkets } from "@/hooks/useMarkets";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";

export default function MarketsPage() {
  const { markets, loading, count } = useMarkets();
  const { selectedCategory } = useAppStore();

  const filtered = selectedCategory
    ? markets.filter((m) => m.category === selectedCategory)
    : markets;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pb-8 pt-6"
      >
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Browse Markets
        </h1>
        <p className="text-base text-gray-400">
          Explore active prediction markets with FHE-encrypted stakes.{" "}
          <span className="text-fhenix-300">{count}</span> market{count !== 1 ? "s" : ""} live.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8">
        <CategoryFilter />
      </div>

      {/* Grid */}
      <section className="pb-16">
        <MarketGrid markets={filtered} loading={loading} />
      </section>
    </div>
  );
}
