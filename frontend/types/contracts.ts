export interface Permission {
  publicKey: `0x${string}`;
  signature: `0x${string}`;
}

export interface TransactionState {
  hash?: `0x${string}`;
  status: "idle" | "pending" | "confirming" | "confirmed" | "error";
  error?: string;
}
