"use client";

import { useAccount } from "wagmi";
import { useMarkets } from "@/hooks/useMarkets";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const { markets } = useMarkets();

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <span className="mb-4 block text-5xl">🔐</span>
        <h2 className="mb-2 text-xl font-bold text-white">Connect Your Wallet</h2>
        <p className="text-gray-500">Connect your wallet to view your encrypted positions</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-2xl font-bold text-white">Portfolio</h1>
        <p className="mb-8 text-gray-400">
          Your encrypted positions across all markets
        </p>
      </motion.div>

      <div className="rounded-xl border border-vault-border bg-vault-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-fhenix-300">
          <span>🔐</span>
          <span>Positions are decrypted client-side using your FHE permit</span>
        </div>

        {markets.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No positions yet. Start predicting!
          </p>
        ) : (
          <div className="space-y-3">
            {markets.map((m) => (
              <div
                key={m.id.toString()}
                className="flex items-center justify-between rounded-lg border border-vault-border bg-vault-bg p-4"
              >
                <div>
                  <p className="text-sm font-medium text-white">{m.question || `Market #${m.id}`}</p>
                  <p className="text-xs text-gray-500">{m.category || "Loading..."}</p>
                </div>
                <a
                  href={`/market/${m.id}`}
                  className="text-sm text-fhenix-400 hover:underline"
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
