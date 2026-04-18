"use client";

import { CategoryFilter } from "@/components/markets/CategoryFilter";
import { MarketGrid } from "@/components/markets/MarketGrid";
import { useMarkets } from "@/hooks/useMarkets";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { RiShieldKeyholeLine, RiLockLine, RiEyeOffLine, RiHandCoinLine } from "react-icons/ri";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function HomePage() {
  const { markets, loading, count } = useMarkets();
  const { selectedCategory } = useAppStore();

  const filtered = selectedCategory
    ? markets.filter((m) => m.category === selectedCategory)
    : markets;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-12 pt-8 text-center sm:pb-16 sm:pt-12"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fhenix-700/30 bg-fhenix-900/20 px-4 py-1.5 text-xs font-medium text-fhenix-300">
          <RiShieldKeyholeLine className="h-3.5 w-3.5" />
          Powered by Fully Homomorphic Encryption
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Predict the Future.
          <br />
          <span className="text-gradient">Stay Private.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          iPredict is the first prediction market where your stakes are{" "}
          <span className="text-fhenix-300">fully encrypted</span>. No one sees how much
          you bet — not validators, not whales, not even the contract.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
          >
            Create a Market <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-to-get-tfhe"
            className="inline-flex items-center gap-2 rounded-xl border border-vault-border bg-vault-surface px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-fhenix-700/40 hover:text-white"
          >
            Get tFHE Tokens
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-glow" />
          {count} active market{count !== 1 ? "s" : ""} on Ethereum Sepolia
        </div>
      </motion.section>

      {/* Feature cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12 grid gap-4 sm:grid-cols-3"
      >
        {[
          {
            icon: RiLockLine,
            title: "Encrypted Stakes",
            desc: "Your bet amount is encrypted with FHE. The contract computes on ciphertexts.",
          },
          {
            icon: RiEyeOffLine,
            title: "Hidden Pools",
            desc: "YES/NO pool split is hidden until resolution. No front-running possible.",
          },
          {
            icon: RiHandCoinLine,
            title: "Fair Payouts",
            desc: "Winners claim proportional rewards. Only 1% fee to the treasury.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 transition-all sm:p-6"
          >
            <f.icon className="mb-3 h-6 w-6 text-fhenix-400" />
            <h3 className="mb-1 text-sm font-semibold text-white">{f.title}</h3>
            <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
          </div>
        ))}
      </motion.section>

      {/* tFHE info section */}
      <motion.section
        id="how-to-get-tfhe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12 overflow-hidden rounded-2xl border border-fhenix-700/20 bg-gradient-to-br from-fhenix-900/20 via-vault-card to-vault-surface"
      >
        <div className="p-6 sm:p-8">
          <h2 className="mb-1 text-lg font-bold text-white sm:text-xl">
            How to Get tFHE &amp; Place Bets
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            tFHE is the testnet token used for predictions on Ethereum Sepolia.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Get Sepolia ETH",
                desc: "Visit a Sepolia faucet like sepoliafaucet.com or cloud.google.com/web3/faucet to get free testnet ETH.",
              },
              {
                step: "2",
                title: "Connect Wallet",
                desc: "Connect your MetaMask or any Web3 wallet. Make sure you're on the Sepolia network (Chain ID 11155111).",
              },
              {
                step: "3",
                title: "Pick a Market",
                desc: "Browse active markets or create your own. Choose YES or NO on any prediction question.",
              },
              {
                step: "4",
                title: "Place Your Bet",
                desc: "Enter your stake amount. It's encrypted with FHE before hitting the chain — your bet size stays private.",
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-xl bg-vault-bg/60 p-4">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-indigo-600/30 text-xs font-bold text-fhenix-300">
                  {s.step}
                </div>
                <h4 className="mb-1 text-sm font-semibold text-white">{s.title}</h4>
                <p className="text-xs leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Markets section */}
      <section className="pb-16">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Live Markets</h2>
          <CategoryFilter />
        </div>
        <MarketGrid markets={filtered} loading={loading} />
      </section>
    </div>
  );
}
