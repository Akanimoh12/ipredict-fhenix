"use client";

import { useState } from "react";
import { useCreateMarket } from "@/hooks/useIPredictCore";
import { useAccount } from "wagmi";
import { CATEGORIES } from "@/types/market";
import { motion } from "framer-motion";

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
    <div className="mx-auto max-w-2xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-2xl font-bold text-white">Create Market</h1>
        <p className="mb-8 text-gray-400">
          Create a new prediction market with FHE-encrypted stakes
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-xl border border-vault-border bg-vault-card p-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will ETH reach $10k by end of 2025?"
              className="w-full rounded-lg border border-vault-border bg-vault-bg px-4 py-2.5 text-white placeholder:text-gray-600 focus:border-fhenix-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-vault-border bg-vault-bg px-4 py-2.5 text-white focus:border-fhenix-600 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-400">
              Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              className="w-full rounded-lg border border-vault-border bg-vault-bg px-4 py-2.5 text-white focus:border-fhenix-600 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/20 p-3 text-sm text-red-400">
            {error.message}
          </div>
        )}

        {isSuccess && (
          <div className="rounded-lg bg-green-900/20 p-3 text-sm text-green-400">
            Market created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isConnected || !question.trim()}
          className="w-full rounded-lg bg-fhenix-600 py-3 text-sm font-medium text-white transition hover:bg-fhenix-500 disabled:cursor-not-allowed disabled:opacity-50"
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
