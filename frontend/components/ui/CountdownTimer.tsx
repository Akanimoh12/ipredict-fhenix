"use client";

import { useMarketCountdown } from "@/hooks/useMarketCountdown";

interface CountdownTimerProps {
  deadline: number;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const { timeLeft, expired } = useMarketCountdown(deadline);

  return (
    <div className={`flex items-center gap-2 text-sm ${expired ? "text-red-400" : "text-fhenix-300"}`}>
      <span>{expired ? "⏰" : "⏳"}</span>
      <span className="font-mono">{timeLeft}</span>
    </div>
  );
}
