"use client";

import { useClaimWinnings } from "@/hooks/useClaimWinnings";

interface ClaimButtonProps {
  marketId: bigint;
  outcome: boolean;
}

export function ClaimButton({ marketId, outcome }: ClaimButtonProps) {
  const { claimWinnings, permitting, isPending, isConfirming, isSuccess } =
    useClaimWinnings(marketId);

  const loading = permitting || isPending || isConfirming;

  return (
    <div className="rounded-xl border border-vault-border bg-vault-card p-5">
      <h3 className="mb-2 text-sm font-medium text-gray-400">Claim Winnings</h3>
      <p className="mb-4 text-sm text-gray-500">
        Market resolved: <span className={outcome ? "text-green-400" : "text-red-400"}>
          {outcome ? "YES" : "NO"}
        </span>
      </p>

      <button
        onClick={claimWinnings}
        disabled={loading || isSuccess}
        className="w-full rounded-lg bg-fhenix-600 py-3 text-sm font-medium text-white transition hover:bg-fhenix-500 disabled:cursor-not-allowed disabled:opacity-50"
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
