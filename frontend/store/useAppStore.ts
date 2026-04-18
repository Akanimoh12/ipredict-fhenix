import { create } from "zustand";

interface AppState {
  selectedCategory: string | null;
  txHash: string | null;
  txStatus: "idle" | "pending" | "confirming" | "confirmed" | "error";
  txError: string | null;
  setCategory: (category: string | null) => void;
  setTx: (hash: string | null, status: AppState["txStatus"], error?: string) => void;
  resetTx: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCategory: null,
  txHash: null,
  txStatus: "idle",
  txError: null,
  setCategory: (category) => set({ selectedCategory: category }),
  setTx: (hash, status, error) =>
    set({ txHash: hash, txStatus: status, txError: error || null }),
  resetTx: () =>
    set({ txHash: null, txStatus: "idle", txError: null }),
}));
