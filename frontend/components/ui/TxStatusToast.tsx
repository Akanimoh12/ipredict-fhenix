"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineX } from "react-icons/hi";

export function TxStatusToast() {
  const { txHash, txStatus, txError, resetTx } = useAppStore();

  useEffect(() => {
    if (txStatus === "confirmed") {
      const timer = setTimeout(resetTx, 5000);
      return () => clearTimeout(timer);
    }
  }, [txStatus, resetTx]);

  if (txStatus === "idle") return null;

  const borderColor =
    txStatus === "error"
      ? "border-red-500/30"
      : txStatus === "confirmed"
      ? "border-emerald-500/30"
      : "border-vault-border";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-6 right-6 z-50 rounded-2xl border ${borderColor} bg-vault-card/95 p-4 shadow-2xl backdrop-blur-2xl`}
      >
        <div className="flex items-center gap-3">
          {txStatus === "pending" && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-fhenix-400 border-t-transparent" />
          )}
          {txStatus === "confirming" && (
            <div className="h-5 w-5 animate-pulse rounded-full bg-amber-400/60" />
          )}
          {txStatus === "confirmed" && (
            <HiOutlineCheckCircle className="h-5 w-5 text-emerald-400" />
          )}
          {txStatus === "error" && (
            <HiOutlineXCircle className="h-5 w-5 text-red-400" />
          )}

          <div>
            <p className="text-sm font-semibold text-white">
              {txStatus === "pending" && "Transaction Pending"}
              {txStatus === "confirming" && "Confirming..."}
              {txStatus === "confirmed" && "Transaction Confirmed"}
              {txStatus === "error" && "Transaction Failed"}
            </p>
            {txHash && (
              <p className="mt-0.5 font-mono text-xs text-gray-500">
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </p>
            )}
            {txError && (
              <p className="mt-0.5 text-xs text-red-400">{txError}</p>
            )}
          </div>

          <button
            onClick={resetTx}
            className="ml-4 rounded-lg p-1 text-gray-500 transition hover:bg-white/5 hover:text-white"
          >
            <HiOutlineX className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
