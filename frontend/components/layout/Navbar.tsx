"use client";

import Link from "next/link";
import { WalletButton } from "./WalletButton";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-vault-border bg-vault-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">
            🔮 <span className="text-fhenix-400">i</span>Predict
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-gray-400 transition hover:text-white">
            Markets
          </Link>
          <Link href="/portfolio" className="text-sm text-gray-400 transition hover:text-white">
            Portfolio
          </Link>
          <Link href="/create" className="text-sm text-gray-400 transition hover:text-white">
            Create
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-fhenix-900/30 px-3 py-1 text-xs text-fhenix-300 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            FHE Active
          </div>
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
