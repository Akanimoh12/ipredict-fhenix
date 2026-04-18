"use client";

import { cn } from "@/lib/utils";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiTimerLine, RiCheckboxCircleLine } from "react-icons/ri";

const STATUS_CONFIG: Record<number, { label: string; color: string; icon: React.ElementType }> = {
  0: { label: "Active", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: HiOutlineStatusOnline },
  1: { label: "Pending", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: RiTimerLine },
  2: { label: "Resolved", color: "text-fhenix-300 bg-fhenix-500/10 border-fhenix-500/20", icon: RiCheckboxCircleLine },
};

export function MarketStatusBadge({ status }: { status: number }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG[0];
  const Icon = config.icon;

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium", config.color)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
