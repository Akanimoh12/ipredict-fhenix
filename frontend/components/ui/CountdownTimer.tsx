"use client";

import { useMarketCountdown } from "@/hooks/useMarketCountdown";
import { HiOutlineClock } from "react-icons/hi";
import { RiAlarmWarningLine } from "react-icons/ri";

interface CountdownTimerProps {
  deadline: number;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const { timeLeft, expired } = useMarketCountdown(deadline);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
        expired
          ? "bg-red-500/10 text-red-400"
          : "bg-fhenix-900/15 text-fhenix-300"
      }`}
    >
      {expired ? (
        <RiAlarmWarningLine className="h-4 w-4" />
      ) : (
        <HiOutlineClock className="h-4 w-4" />
      )}
      <span className="font-mono text-xs">{timeLeft}</span>
    </div>
  );
}
