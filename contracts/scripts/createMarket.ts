import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const coreAddress = process.env.CORE_ADDRESS;
  if (!coreAddress) throw new Error("Set CORE_ADDRESS env var");

  const core = await ethers.getContractAt("IPredictCore", coreAddress);

  const markets = [
    {
      question: "Will Bitcoin reach $100k by end of 2026?",
      category: "Crypto",
      deadline: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    },
    {
      question: "Will the Lakers win the 2026 NBA Championship?",
      category: "Sports",
      deadline: Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60,
    },
    {
      question: "Will GPT-5 be released before July 2026?",
      category: "Tech",
      deadline: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60,
    },
    {
      question: "Will the US pass a major crypto regulation bill in 2026?",
      category: "Politics",
      deadline: Math.floor(Date.now() / 1000) + 120 * 24 * 60 * 60,
    },
    {
      question: "Will Taylor Swift release a new album before December 2026?",
      category: "Pop Culture",
      deadline: Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60,
    },
  ];

  for (const m of markets) {
    console.log(`Creating market: ${m.question}`);
    const tx = await core.createMarket(m.question, m.category, m.deadline);
    const receipt = await tx.wait();
    console.log(`  tx: ${receipt?.hash}`);
  }

  const count = await core.getMarketCount();
  console.log(`\nTotal markets: ${count}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
