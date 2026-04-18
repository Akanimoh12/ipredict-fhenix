"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

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
                className="rounded-lg bg-fhenix-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-fhenix-500"
              >
                Connect Wallet
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
              >
                Wrong Network
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                className="flex items-center gap-2 rounded-lg border border-vault-border bg-vault-card px-3 py-2 text-sm text-white transition hover:border-fhenix-600"
              >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                {account.displayName}
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
