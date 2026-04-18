import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatPool(wei: bigint): string {
  const eth = Number(wei) / 1e18;
  if (eth >= 1000) return `${(eth / 1000).toFixed(1)}k tFHE`;
  if (eth >= 1) return `${eth.toFixed(2)} tFHE`;
  return `${eth.toFixed(4)} tFHE`;
}

export function formatDeadline(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeUntil(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;
  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getStatusColor(status: number): string {
  switch (status) {
    case 0:
      return "text-green-400";
    case 1:
      return "text-yellow-400";
    case 2:
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
}

export function getStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "Open";
    case 1:
      return "Locked";
    case 2:
      return "Resolved";
    default:
      return "Unknown";
  }
}
