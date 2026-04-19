"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RiShieldKeyholeLine,
  RiLockLine,
  RiEyeOffLine,
  RiHandCoinLine,
  RiBarChartBoxLine,
  RiTeamLine,
  RiFlashlightLine,
} from "react-icons/ri";
import {
  HiOutlineArrowRight,
  HiOutlineChevronDown,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ──────────────── HERO ──────────────── */}
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[480px] w-[480px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-fhenix-700/30 bg-fhenix-900/20 px-4 py-1.5 text-xs font-medium text-fhenix-300">
            <RiShieldKeyholeLine className="h-3.5 w-3.5" />
            Powered by Fully Homomorphic Encryption
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Predict the Future.
            <br />
            <span className="text-gradient">Stay Private.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            The first prediction market where your stakes are{" "}
            <span className="text-fhenix-300">fully encrypted</span>. No one
            sees how much you bet — not validators, not whales, not even the
            contract.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.98]"
            >
              Browse Markets <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-vault-border bg-vault-surface px-7 py-3.5 text-sm font-semibold text-gray-300 transition hover:border-fhenix-700/40 hover:text-white"
            >
              How It Works <HiOutlineChevronDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-gray-700 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-fhenix-400"
            />
          </div>
        </motion.div>
      </section>

      {/* ──────────────── STATS BANNER ──────────────── */}
      <section className="border-y border-vault-border/40 bg-vault-card/30 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-vault-border/40">
          {[
            { value: "FHE", label: "Encryption Standard" },
            { value: "100%", label: "Stake Privacy" },
            { value: "1%", label: "Platform Fee" },
            { value: "Sepolia", label: "Live Network" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── WHY iPREDICT ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 text-center"
        >
          <motion.p variants={fadeUp} custom={0} className="mb-2 text-sm font-semibold uppercase tracking-widest text-fhenix-400">
            Why iPredict
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Privacy Meets Prediction Markets
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-xl text-gray-400">
            Traditional prediction markets expose your position size to everyone.
            iPredict leverages Fhenix CoFHE to keep every stake encrypted on-chain.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: RiLockLine,
              title: "Encrypted Stakes",
              desc: "Your bet amount is encrypted with FHE before it touches the blockchain. The smart contract computes on ciphertexts, not plain values.",
            },
            {
              icon: RiEyeOffLine,
              title: "Hidden Pool Split",
              desc: "No one can see the YES/NO pool ratio until the market is resolved. This eliminates information leakage and last-minute front-running.",
            },
            {
              icon: RiHandCoinLine,
              title: "Fair & Transparent Payouts",
              desc: "Winners claim proportional rewards directly from the contract. Only a 1% fee goes to the treasury — no hidden costs.",
            },
            {
              icon: RiBarChartBoxLine,
              title: "Any Topic, Any Outcome",
              desc: "Crypto, sports, politics, tech, entertainment — create a YES/NO market on anything you can think of.",
            },
            {
              icon: RiTeamLine,
              title: "Community-Driven",
              desc: "Anyone can create a market. An oracle resolves outcomes. The protocol stays neutral and permissionless.",
            },
            {
              icon: RiFlashlightLine,
              title: "Sepolia-Ready",
              desc: "Deployed on Ethereum Sepolia today. Test with free tFHE tokens and experience privacy-first predictions first-hand.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="glass-card group rounded-2xl p-6 transition-all hover:border-fhenix-700/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 transition-colors group-hover:from-violet-500/30 group-hover:to-indigo-600/30">
                <f.icon className="h-5 w-5 text-fhenix-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section id="how-it-works" className="border-t border-vault-border/40 bg-vault-card/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14 text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="mb-2 text-sm font-semibold uppercase tracking-widest text-fhenix-400">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              From Wallet to Winning
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-xl text-gray-400">
              Four simple steps to place your first private prediction.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                step: "01",
                title: "Get Sepolia ETH",
                desc: "Visit a Sepolia faucet like sepoliafaucet.com or cloud.google.com/web3/faucet to get free testnet ETH.",
              },
              {
                step: "02",
                title: "Connect Your Wallet",
                desc: "Connect MetaMask or any Web3 wallet and switch to the Sepolia network (Chain ID 11155111).",
              },
              {
                step: "03",
                title: "Pick a Market",
                desc: "Browse active markets or create your own. Choose YES or NO on any prediction question.",
              },
              {
                step: "04",
                title: "Place Your Bet",
                desc: "Enter your stake amount. It's encrypted with FHE before hitting the chain — your bet size stays private.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                custom={i}
                className="relative rounded-2xl border border-vault-border/50 bg-vault-bg/60 p-6 backdrop-blur-sm"
              >
                <span className="mb-4 inline-block text-3xl font-extrabold text-fhenix-700/40">
                  {s.step}
                </span>
                <h4 className="mb-2 text-base font-semibold text-white">{s.title}</h4>
                <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────── CTA ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border border-fhenix-700/20 bg-gradient-to-br from-fhenix-900/30 via-vault-card to-vault-surface p-10 text-center sm:p-16"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-violet-600/10 blur-[100px]" />
          </div>

          <motion.div variants={fadeUp} custom={0} className="relative z-10">
            <RiShieldKeyholeLine className="mx-auto mb-5 h-10 w-10 text-fhenix-400" />
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              Ready to Predict Privately?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-gray-400">
              Start exploring live markets or create your own. Your stakes,
              your privacy, your call.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.98]"
              >
                Browse Markets <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-xl border border-vault-border bg-vault-surface px-7 py-3.5 text-sm font-semibold text-gray-300 transition hover:border-fhenix-700/40 hover:text-white"
              >
                Create a Market
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
