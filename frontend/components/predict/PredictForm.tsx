"use client";

import { useState } from "react";
import { useEncryptedVote } from "@/hooks/useEncryptedVote";
import { useAccount } from "wagmi";

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
    <div className="rounded-xl border border-vault-border bg-vault-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Place Prediction</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setIsYes(true)}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            isYes
              ? "bg-green-500 text-white"
              : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
          }`}
        >
          YES
        </button>
        <button
          onClick={() => setIsYes(false)}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            !isYes
              ? "bg-red-500 text-white"
              : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
          }`}
        >
          NO
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-gray-400">Amount (tFHE)</label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-vault-border bg-vault-bg px-4 py-2.5 text-white placeholder:text-gray-600 focus:border-fhenix-600 focus:outline-none"
          />
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-lg bg-fhenix-900/20 px-3 py-2 text-xs text-fhenix-300">
          <span>🔐</span>
          <span>Your stake amount will be encrypted with FHE before submission</span>
        </div>

        <button
          type="submit"
          disabled={loading || !isConnected || !amount}
          className="w-full rounded-lg bg-fhenix-600 py-3 text-sm font-medium text-white transition hover:bg-fhenix-500 disabled:cursor-not-allowed disabled:opacity-50"
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
