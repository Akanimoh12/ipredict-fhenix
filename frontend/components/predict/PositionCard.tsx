"use client";

import { useUserPosition } from "@/hooks/useUserPosition";
import { RiShieldKeyholeLine } from "react-icons/ri";

interface PositionCardProps {
  marketId: bigint;
  userAddress: string;
}

export function PositionCard({ marketId, userAddress }: PositionCardProps) {
  const { position, loading, error } = useUserPosition(marketId, userAddress);

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-5">
        <div className="h-20 animate-pulse rounded-xl bg-vault-bg/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
        Failed to load position: {error}
      </div>
    );
  }

  if (!position) return null;

  const hasPosition = position.yesAmount > 0 || position.noAmount > 0;

  if (!hasPosition) return null;

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-3 text-sm font-semibold text-gray-400">Your Position</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
          <p className="text-xs font-medium text-emerald-400">YES Stake</p>
          <p className="mt-1 text-xl font-bold text-emerald-300">
            {position.yesAmount}
          </p>
        </div>
        <div className="rounded-xl bg-red-500/10 p-4 text-center">
          <p className="text-xs font-medium text-red-400">NO Stake</p>
          <p className="mt-1 text-xl font-bold text-red-300">
            {position.noAmount}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600">
        <RiShieldKeyholeLine className="h-3.5 w-3.5 text-fhenix-400" />
        Decrypted with your FHE permission
      </div>
    </div>
  );
}
