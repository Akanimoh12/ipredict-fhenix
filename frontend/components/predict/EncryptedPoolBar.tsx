import { formatPool } from "@/lib/utils";
import { RiLockLine } from "react-icons/ri";

interface EncryptedPoolBarProps {
  totalPool: bigint;
}

export function EncryptedPoolBar({ totalPool }: EncryptedPoolBarProps) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">Encrypted Pool</h3>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-fhenix-700/20 bg-fhenix-900/15 px-2.5 py-1 text-xs font-medium text-fhenix-300">
          <RiLockLine className="h-3 w-3" />
          FHE Protected
        </span>
      </div>

      <div className="mb-3 text-2xl font-bold text-white">
        {formatPool(totalPool)}
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-vault-bg/80">
        <div className="flex h-full">
          <div className="rounded-l-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: "50%" }} />
          <div className="rounded-r-full bg-gradient-to-r from-red-400 to-red-500 transition-all" style={{ width: "50%" }} />
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>YES pool (encrypted)</span>
        <span>NO pool (encrypted)</span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-gray-600">
        Individual stakes are fully encrypted. The bar shows a 50/50 placeholder — the true
        split is hidden until resolution.
      </p>
    </div>
  );
}
