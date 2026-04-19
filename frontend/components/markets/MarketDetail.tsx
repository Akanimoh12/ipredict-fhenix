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
import { RiLockLine, RiUserLine, RiCalendarLine } from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";

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
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/markets"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-white"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to Markets
      </Link>

      {/* Two-column layout on large screens */}
      <div className="gap-6 lg:grid lg:grid-cols-[1fr_380px]">
        {/* Left column — market info */}
        <div className="space-y-5">
          {/* Info card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-fhenix-900/30 px-3 py-1 text-xs font-medium text-fhenix-300">
                  {m.category}
                </span>
                <PrivacyBadge />
              </div>
              <MarketStatusBadge status={m.status} />
            </div>

            <h1 className="mb-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {m.question}
            </h1>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-vault-bg/60 p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <RiCalendarLine className="h-3.5 w-3.5" />
                  Deadline
                </div>
                <p className="text-sm font-medium text-white">{formatDeadline(Number(m.deadline))}</p>
              </div>
              <div className="rounded-xl bg-vault-bg/60 p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <RiLockLine className="h-3.5 w-3.5" />
                  Pool
                </div>
                <p className="text-sm font-medium text-white">{formatPool(m.publicTotalPool)}</p>
              </div>
              <div className="rounded-xl bg-vault-bg/60 p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <RiUserLine className="h-3.5 w-3.5" />
                  Creator
                </div>
                <p className="truncate text-sm font-medium text-white">
                  {m.creator.slice(0, 6)}…{m.creator.slice(-4)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <CountdownTimer deadline={Number(m.deadline)} />
            </div>
          </div>

          {/* Pool bar */}
          <EncryptedPoolBar totalPool={m.publicTotalPool} />

          {/* Position — shown below pool on mobile, also shown in left col on desktop */}
          {address && <PositionCard marketId={marketId} userAddress={address} />}

          {/* Claim */}
          {m.status === 2 && address && (
            <ClaimButton marketId={marketId} outcome={m.outcome} />
          )}
        </div>

        {/* Right column — predict form (sticky on large screens) */}
        {m.status === 0 && (
          <div className="mt-5 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <PredictForm marketId={marketId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
