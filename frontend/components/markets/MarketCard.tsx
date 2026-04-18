"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MarketStatusBadge } from "./MarketStatusBadge";
import { formatPool, timeUntil } from "@/lib/utils";
import type { MarketView } from "@/types/market";

interface MarketCardProps {
  market: MarketView;
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/market/${market.id.toString()}`}>
        <div className="group cursor-pointer rounded-xl border border-vault-border bg-vault-card p-5 transition hover:border-fhenix-600/50">
          <div className="mb-3 flex items-start justify-between">
            <span className="rounded-full bg-fhenix-900/30 px-2.5 py-0.5 text-xs text-fhenix-300">
              {market.category}
            </span>
            <MarketStatusBadge status={Number(market.status)} />
          </div>

          <h3 className="mb-4 text-lg font-semibold text-white group-hover:text-fhenix-300">
            {market.question}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-xs">🔒</span>
              <span>Pool: {formatPool(market.publicTotalPool)}</span>
            </div>
            <span className="text-gray-500">
              {timeUntil(Number(market.deadline))}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg bg-green-500/10 py-1.5 text-center text-xs font-medium text-green-400">
              YES
            </div>
            <div className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-center text-xs font-medium text-red-400">
              NO
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
