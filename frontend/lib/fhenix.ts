// CoFHE encryption helpers
// In CoFHE, encrypted inputs use InEuint32 struct { hash, utype, securityZone, signature }
// For the demo frontend, we create a plaintext-wrapped input (works with mock CoFHE)

export interface InEuint32 {
  hash: `0x${string}`;
  utype: number;
  securityZone: number;
  signature: `0x${string}`;
}

export function encryptAmount(amount: number): InEuint32 {
  // Create a deterministic hash from the amount for demo purposes
  const amountHex = amount.toString(16).padStart(64, "0");
  return {
    hash: `0x${amountHex}` as `0x${string}`,
    utype: 4, // euint32
    securityZone: 0,
    signature: "0x" as `0x${string}`,
  };
}
