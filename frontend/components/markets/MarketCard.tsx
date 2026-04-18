"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MarketStatusBadge } from "./MarketStatusBadge";
import { formatPool, timeUntil } from "@/lib/utils";
import { RiLockLine } from "react-icons/ri";
import { HiOutlineClock, HiOutlineArrowRight } from "react-icons/hi";
import type { MarketView } from "@/types/market";

interface MarketCardProps {
  market: MarketView;
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/market/${market.id.toString()}`}>
        <div className="glass-card group relative cursor-pointer rounded-2xl p-5 transition-all hover:glow-violet sm:p-6">
          {/* Top row */}
          <div className="mb-3 flex items-start justify-between">
            <span className="rounded-lg bg-fhenix-900/30 px-2.5 py-1 text-xs font-medium text-fhenix-300">
              {market.category}
            </span>
            <MarketStatusBadge status={Number(market.status)} />
          </div>

          {/* Question */}
          <h3 className="mb-4 line-clamp-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-fhenix-300 sm:text-lg">
            {market.question}
          </h3>

          {/* Pool & Time */}
          <div className="mb-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-gray-400">
              <RiLockLine className="h-3.5 w-3.5 text-fhenix-400" />
              <span>{formatPool(market.publicTotalPool)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <HiOutlineClock className="h-3.5 w-3.5" />
              <span className="text-xs">{timeUntil(Number(market.deadline))}</span>
            </div>
          </div>

          {/* YES / NO buttons */}
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl bg-emerald-500/10 py-2 text-center text-xs font-semibold text-emerald-400 transition group-hover:bg-emerald-500/15">
              YES
            </div>
            <div className="flex-1 rounded-xl bg-red-500/10 py-2 text-center text-xs font-semibold text-red-400 transition group-hover:bg-red-500/15">
              NO
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-5 right-5 opacity-0 transition-opacity group-hover:opacity-100 sm:bottom-6 sm:right-6">
            <HiOutlineArrowRight className="h-4 w-4 text-fhenix-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
