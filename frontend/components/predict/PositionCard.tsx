"use client";

import { useUserPosition } from "@/hooks/useUserPosition";

interface PositionCardProps {
  marketId: bigint;
  userAddress: string;
}

export function PositionCard({ marketId, userAddress }: PositionCardProps) {
  const { position, loading, error } = useUserPosition(marketId, userAddress);

  if (loading) {
    return (
      <div className="rounded-xl border border-vault-border bg-vault-card p-5">
        <div className="h-20 animate-pulse rounded-lg bg-vault-bg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-vault-card p-5 text-sm text-red-400">
        Failed to load position: {error}
      </div>
    );
  }

  if (!position) return null;

  const hasPosition = position.yesAmount > 0 || position.noAmount > 0;

  if (!hasPosition) return null;

  return (
    <div className="rounded-xl border border-vault-border bg-vault-card p-5">
      <h3 className="mb-3 text-sm font-medium text-gray-400">Your Position</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-green-500/10 p-3 text-center">
          <p className="text-xs text-green-400">YES Stake</p>
          <p className="mt-1 text-lg font-bold text-green-300">
            {position.yesAmount}
          </p>
        </div>
        <div className="rounded-lg bg-red-500/10 p-3 text-center">
          <p className="text-xs text-red-400">NO Stake</p>
          <p className="mt-1 text-lg font-bold text-red-300">
            {position.noAmount}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-600">
        🔐 Your position was decrypted using your FHE permission
      </p>
    </div>
  );
}
