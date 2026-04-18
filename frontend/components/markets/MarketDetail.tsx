"use client";

import { useMarket } from "@/hooks/useIPredictCore";
import { MarketStatusBadge } from "./MarketStatusBadge";
import { EncryptedPoolBar } from "../predict/EncryptedPoolBar";
import { PredictForm } from "../predict/PredictForm";
import { PositionCard } from "../predict/PositionCard";
import { ClaimButton } from "../predict/ClaimButton";
import { CountdownTimer } from "../ui/CountdownTimer";
import { PrivacyBadge } from "../ui/PrivacyBadge";
import { formatPool, formatDeadline } from "@/lib/utils";
import { useAccount } from "wagmi";

interface MarketDetailProps {
  marketId: bigint;
}

export function MarketDetail({ marketId }: MarketDetailProps) {
  const { data: market, isLoading } = useMarket(marketId);
  const { address } = useAccount();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-fhenix-400 border-t-transparent" />
      </div>
    );
  }

  if (!market) {
    return <div className="py-20 text-center text-gray-500">Market not found</div>;
  }

  const m = market as {
    id: bigint;
    question: string;
    category: string;
    deadline: bigint;
    resolutionTime: bigint;
    creator: string;
    status: number;
    outcome: boolean;
    publicTotalPool: bigint;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border border-vault-border bg-vault-card p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-fhenix-900/30 px-3 py-1 text-sm text-fhenix-300">
              {m.category}
            </span>
            <PrivacyBadge />
          </div>
          <MarketStatusBadge status={m.status} />
        </div>

        <h1 className="mb-4 text-2xl font-bold text-white">{m.question}</h1>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Deadline</span>
            <p className="text-white">{formatDeadline(Number(m.deadline))}</p>
          </div>
          <div>
            <span className="text-gray-500">Total Pool</span>
            <p className="text-white">{formatPool(m.publicTotalPool)}</p>
          </div>
        </div>

        <div className="mt-4">
          <CountdownTimer deadline={Number(m.deadline)} />
        </div>
      </div>

      <EncryptedPoolBar totalPool={m.publicTotalPool} />

      {m.status === 0 && <PredictForm marketId={marketId} />}

      {address && <PositionCard marketId={marketId} userAddress={address} />}

      {m.status === 2 && address && (
        <ClaimButton marketId={marketId} outcome={m.outcome} />
      )}
    </div>
  );
}
