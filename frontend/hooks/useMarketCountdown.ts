"use client";

import { useState, useEffect } from "react";

export function useMarketCountdown(deadline: number) {
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        setExpired(true);
        return;
      }

      setExpired(false);
      const d = Math.floor(diff / 86400);
      const h = Math.floor((diff % 86400) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      if (d > 0) {
        setTimeLeft(`${d}d ${h}h ${m}m`);
      } else if (h > 0) {
        setTimeLeft(`${h}h ${m}m ${s}s`);
      } else {
        setTimeLeft(`${m}m ${s}s`);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return { timeLeft, expired };
}
