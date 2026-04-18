"use client";

import { CategoryFilter } from "@/components/markets/CategoryFilter";
import { MarketGrid } from "@/components/markets/MarketGrid";
import { useMarkets } from "@/hooks/useMarkets";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";

export default function HomePage() {
  const { markets, loading, count } = useMarkets();
  const { selectedCategory } = useAppStore();

  const filtered = selectedCategory
    ? markets.filter((m) => m.category === selectedCategory)
    : markets;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-3 text-4xl font-bold text-white">
          🔮 <span className="text-fhenix-400">i</span>Predict
        </h1>
        <p className="mx-auto max-w-lg text-gray-400">
          Privacy-native prediction markets powered by Fully Homomorphic Encryption.
          Your stakes are encrypted — no one sees how much you bet.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-fhenix-900/20 px-4 py-1.5 text-sm text-fhenix-300">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {count} active markets
        </div>
      </motion.div>

      <div className="mb-6">
        <CategoryFilter />
      </div>

      <MarketGrid markets={filtered} loading={loading} />
    </div>
  );
}
