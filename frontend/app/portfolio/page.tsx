"use client";

import { useAccount } from "wagmi";
import { useMarkets } from "@/hooks/useMarkets";
import { motion } from "framer-motion";
import { RiShieldKeyholeLine, RiWallet3Line } from "react-icons/ri";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function PortfolioPage() {
  const { isConnected } = useAccount();
  const { markets } = useMarkets();

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20">
          <RiWallet3Line className="h-8 w-8 text-fhenix-400" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-white">Connect Your Wallet</h2>
        <p className="text-sm text-gray-500">Connect your wallet to view your encrypted positions</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-1 text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-sm text-gray-400">
          Your encrypted positions across all markets
        </p>
      </motion.div>

      <div className="glass-card rounded-2xl p-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-fhenix-700/20 bg-fhenix-900/15 px-4 py-2.5 text-xs text-fhenix-300">
          <RiShieldKeyholeLine className="h-4 w-4 text-fhenix-400" />
          Positions are decrypted client-side using your FHE permit
        </div>

        {markets.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-sm text-gray-500">No positions yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
            >
              Start Predicting <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {markets.map((m) => (
              <Link
                key={m.id.toString()}
                href={`/market/${m.id}`}
                className="group flex items-center justify-between rounded-xl border border-vault-border bg-vault-bg/60 p-4 transition hover:border-fhenix-700/40"
              >
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-fhenix-300">
                    {m.question || `Market #${m.id}`}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{m.category || "Loading..."}</p>
                </div>
                <HiOutlineArrowRight className="h-4 w-4 text-gray-600 transition group-hover:text-fhenix-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
