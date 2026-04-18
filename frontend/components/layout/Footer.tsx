"use client";

import { RiShieldKeyholeLine } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t border-vault-border/40 bg-vault-bg/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/30 to-indigo-600/30">
              <RiShieldKeyholeLine className="h-3 w-3 text-fhenix-400" />
            </div>
            <span className="text-sm text-gray-500">
              iPredict — Privacy-first markets on{" "}
              <span className="text-fhenix-400">Fhenix CoFHE</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://fhenix.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 transition hover:text-fhenix-400"
            >
              Fhenix <FiExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://docs.fhenix.zone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 transition hover:text-fhenix-400"
            >
              Docs <FiExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://sepolia.etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 transition hover:text-fhenix-400"
            >
              Explorer <FiExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
