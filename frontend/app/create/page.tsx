"use client";

import { useState } from "react";
import { useCreateMarket } from "@/hooks/useIPredictCore";
import { useAccount } from "wagmi";
import { CATEGORIES } from "@/types/market";
import { motion } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function CreateMarketPage() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Crypto");
  const [deadlineDays, setDeadlineDays] = useState("7");
  const { createMarket, isPending, isConfirming, isSuccess, error } = useCreateMarket();
  const { isConnected } = useAccount();

  const loading = isPending || isConfirming;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const deadline = BigInt(
      Math.floor(Date.now() / 1000) + Number(deadlineDays) * 86400
    );
    createMarket(question, category, deadline);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-600/30">
            <HiOutlinePlus className="h-5 w-5 text-fhenix-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Market</h1>
        </div>
        <p className="text-sm text-gray-400">
          Create a new prediction market with FHE-encrypted stakes
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="glass-card space-y-5 rounded-2xl p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will ETH reach $10k by end of 2025?"
              className="w-full rounded-xl border border-vault-border bg-vault-bg/80 px-4 py-3 text-white placeholder:text-gray-600 transition focus:border-fhenix-500 focus:outline-none focus:ring-1 focus:ring-fhenix-500/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-vault-border bg-vault-bg/80 px-4 py-3 text-white transition focus:border-fhenix-500 focus:outline-none focus:ring-1 focus:ring-fhenix-500/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">
              Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              className="w-full rounded-xl border border-vault-border bg-vault-bg/80 px-4 py-3 text-white transition focus:border-fhenix-500 focus:outline-none focus:ring-1 focus:ring-fhenix-500/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-fhenix-700/20 bg-fhenix-900/15 px-4 py-3 text-xs text-fhenix-300">
          <RiShieldKeyholeLine className="h-4 w-4 shrink-0 text-fhenix-400" />
          <span>All stakes in this market will be encrypted with FHE</span>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error.message}
          </div>
        )}

        {isSuccess && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            Market created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isConnected || !question.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {!isConnected
            ? "Connect Wallet"
            : isPending
            ? "Creating..."
            : isConfirming
            ? "Confirming..."
            : "Create Market"}
        </button>
      </form>
    </div>
  );
}
