"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HiOutlineWifi } from "react-icons/hi";

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
            })}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 active:scale-[0.98]"
              >
                Connect Wallet
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 ring-1 ring-red-500/30 transition hover:bg-red-500/30"
              >
                Wrong Network
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                className="flex items-center gap-2 rounded-xl border border-vault-border bg-vault-surface px-3.5 py-2 text-sm font-medium text-white transition hover:border-fhenix-700/50 hover:bg-vault-card"
              >
                <HiOutlineWifi className="h-3.5 w-3.5 text-emerald-400" />
                {account.displayName}
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
