"use client";

import { useState } from "react";
import { usePrepareClaim } from "./useIPredictCore";

export function useClaimWinnings(marketId: bigint) {
  const { prepareClaim, hash, isPending, isConfirming, isSuccess, error } = usePrepareClaim();
  const [preparing, setPreparing] = useState(false);

  const claimWinnings = async () => {
    setPreparing(true);
    try {
      // Step 1: prepareClaim triggers FHE.allowPublic on user's stake + pools.
      // In production, a relayer/UI would poll for the decrypted values and
      // then call claimWinnings with the verified signatures.
      // For the demo, we trigger the prepare step.
      prepareClaim(marketId);
    } finally {
      setPreparing(false);
    }
  };

  return {
    claimWinnings,
    permitting: preparing,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
