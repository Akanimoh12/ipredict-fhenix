import { ethers } from "hardhat";

async function main() {
  const oracleAddress = process.env.ORACLE_ADDRESS;
  const marketId = process.env.MARKET_ID;
  const outcome = process.env.OUTCOME;

  if (!oracleAddress) throw new Error("Set ORACLE_ADDRESS env var");
  if (!marketId) throw new Error("Set MARKET_ID env var");
  if (outcome === undefined) throw new Error("Set OUTCOME env var (true/false)");

  const oracle = await ethers.getContractAt("IPredictOracle", oracleAddress);
  const outcomeValue = outcome === "true";

  console.log(`Resolving market ${marketId} with outcome: ${outcomeValue}`);
  const tx = await oracle.setOutcome(BigInt(marketId), outcomeValue);
  const receipt = await tx.wait();
  console.log(`Resolved in tx: ${receipt?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
