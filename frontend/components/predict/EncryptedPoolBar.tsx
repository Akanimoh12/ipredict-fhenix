import { formatPool } from "@/lib/utils";

interface EncryptedPoolBarProps {
  totalPool: bigint;
}

export function EncryptedPoolBar({ totalPool }: EncryptedPoolBarProps) {
  return (
    <div className="rounded-xl border border-vault-border bg-vault-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">Encrypted Pool</h3>
        <span className="text-xs text-fhenix-300">🔒 FHE Protected</span>
      </div>

      <div className="mb-2 text-2xl font-bold text-white">
        {formatPool(totalPool)}
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-vault-bg">
        <div className="flex h-full">
          <div
            className="bg-green-500 transition-all"
            style={{ width: "50%" }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: "50%" }}
          />
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>YES pool (encrypted)</span>
        <span>NO pool (encrypted)</span>
      </div>

      <p className="mt-3 text-xs text-gray-600">
        Individual stakes are fully encrypted. The bar shows a 50/50 placeholder — true
        split is hidden until resolution.
      </p>
    </div>
  );
}
