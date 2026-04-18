import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface MarketStatusBadgeProps {
  status: number;
}

export function MarketStatusBadge({ status }: MarketStatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)} bg-white/5`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
