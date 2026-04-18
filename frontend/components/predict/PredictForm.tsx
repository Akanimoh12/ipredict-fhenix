"use client";

import { useState } from "react";
import { useEncryptedVote } from "@/hooks/useEncryptedVote";
import { useAccount } from "wagmi";
import { RiShieldKeyholeLine } from "react-icons/ri";

interface PredictFormProps {
  marketId: bigint;
}

export function PredictForm({ marketId }: PredictFormProps) {
  const [amount, setAmount] = useState("");
  const [isYes, setIsYes] = useState(true);
  const { submitVote, encrypting, isPending, isConfirming, isSuccess } = useEncryptedVote();
  const { isConnected } = useAccount();

  const loading = encrypting || isPending || isConfirming;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    await submitVote(marketId, Math.round(Number(amount) * 1e4), isYes, amount);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="mb-5 text-lg font-bold text-white">Place Prediction</h3>

      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setIsYes(true)}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
            isYes
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          }`}
        >
          YES
        </button>
        <button
          onClick={() => setIsYes(false)}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
            !isYes
              ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
              : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
          }`}
        >
          NO
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-400">
            Amount (tFHE)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-vault-border bg-vault-bg/80 px-4 py-3 text-white placeholder:text-gray-600 transition focus:border-fhenix-500 focus:outline-none focus:ring-1 focus:ring-fhenix-500/30"
          />
        </div>

        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-fhenix-700/20 bg-fhenix-900/15 px-4 py-3 text-xs text-fhenix-300">
          <RiShieldKeyholeLine className="h-4 w-4 shrink-0 text-fhenix-400" />
          <span>Your stake is encrypted with FHE before submission</span>
        </div>

        <button
          type="submit"
          disabled={loading || !isConnected || !amount}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {!isConnected
            ? "Connect Wallet"
            : encrypting
            ? "Encrypting..."
            : isPending
            ? "Confirming..."
            : isConfirming
            ? "Waiting..."
            : isSuccess
            ? "Predicted!"
            : `Predict ${isYes ? "YES" : "NO"}`}
        </button>
      </form>
    </div>
  );
}
