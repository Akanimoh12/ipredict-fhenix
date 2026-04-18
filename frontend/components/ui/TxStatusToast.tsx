"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export function TxStatusToast() {
  const { txHash, txStatus, txError, resetTx } = useAppStore();

  useEffect(() => {
    if (txStatus === "confirmed") {
      const timer = setTimeout(resetTx, 5000);
      return () => clearTimeout(timer);
    }
  }, [txStatus, resetTx]);

  if (txStatus === "idle") return null;

  const bgColor =
    txStatus === "error"
      ? "bg-red-900/90"
      : txStatus === "confirmed"
      ? "bg-green-900/90"
      : "bg-vault-card/90";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-6 right-6 z-50 rounded-xl border border-vault-border ${bgColor} p-4 shadow-xl backdrop-blur`}
      >
        <div className="flex items-center gap-3">
          {txStatus === "pending" && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-fhenix-400 border-t-transparent" />
          )}
          {txStatus === "confirming" && (
            <div className="h-4 w-4 animate-pulse rounded-full bg-yellow-400" />
          )}
          {txStatus === "confirmed" && (
            <span className="text-green-400">✓</span>
          )}
          {txStatus === "error" && <span className="text-red-400">✗</span>}

          <div>
            <p className="text-sm font-medium text-white">
              {txStatus === "pending" && "Transaction Pending"}
              {txStatus === "confirming" && "Confirming..."}
              {txStatus === "confirmed" && "Transaction Confirmed"}
              {txStatus === "error" && "Transaction Failed"}
            </p>
            {txHash && (
              <p className="mt-0.5 font-mono text-xs text-gray-400">
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </p>
            )}
            {txError && (
              <p className="mt-0.5 text-xs text-red-300">{txError}</p>
            )}
          </div>

          <button
            onClick={resetTx}
            className="ml-4 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
