"use client";

import { useClaimWinnings } from "@/hooks/useClaimWinnings";
import { HiOutlineGift } from "react-icons/hi";

interface ClaimButtonProps {
  marketId: bigint;
  outcome: boolean;
}

export function ClaimButton({ marketId, outcome }: ClaimButtonProps) {
  const { claimWinnings, permitting, isPending, isConfirming, isSuccess } =
    useClaimWinnings(marketId);

  const loading = permitting || isPending || isConfirming;

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <HiOutlineGift className="h-5 w-5 text-fhenix-400" />
        <h3 className="text-sm font-semibold text-white">Claim Winnings</h3>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Market resolved:{" "}
        <span className={outcome ? "font-semibold text-emerald-400" : "font-semibold text-red-400"}>
          {outcome ? "YES" : "NO"}
        </span>
      </p>

      <button
        onClick={claimWinnings}
        disabled={loading || isSuccess}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {permitting
          ? "Generating Permit..."
          : isPending
          ? "Claiming..."
          : isConfirming
          ? "Confirming..."
          : isSuccess
          ? "Claimed!"
          : "Claim Winnings"}
      </button>
    </div>
  );
}
