// Privara SDK integration for privacy-preserving payouts
export async function requestPrivaraPayout(
  recipientAddress: string,
  amount: bigint,
  marketId: number
): Promise<string> {
  const response = await fetch("/api/privara/payout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: recipientAddress,
      amount: amount.toString(),
      marketId,
    }),
  });

  if (!response.ok) {
    throw new Error("Privara payout request failed");
  }

  const data = await response.json();
  return data.txHash;
}

export async function checkPrivaraStatus(txHash: string): Promise<string> {
  const response = await fetch(`/api/privara/status?tx=${txHash}`);
  if (!response.ok) {
    throw new Error("Privara status check failed");
  }
  const data = await response.json();
  return data.status;
}
