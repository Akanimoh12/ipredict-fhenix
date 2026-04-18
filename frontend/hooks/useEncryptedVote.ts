"use client";

import { useState } from "react";
import { encryptAmount } from "@/lib/fhenix";
import { usePredict } from "./useIPredictCore";
import { parseEther } from "viem";

export function useEncryptedVote() {
  const { predict, hash, isPending, isConfirming, isSuccess, error } = usePredict();
  const [encrypting, setEncrypting] = useState(false);

  const submitVote = async (
    marketId: bigint,
    amount: number,
    isYes: boolean,
    ethValue: string
  ) => {
    setEncrypting(true);
    try {
      const encrypted = encryptAmount(amount);
      predict(marketId, encrypted, isYes, parseEther(ethValue));
    } finally {
      setEncrypting(false);
    }
  };

  return {
    submitVote,
    encrypting,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
