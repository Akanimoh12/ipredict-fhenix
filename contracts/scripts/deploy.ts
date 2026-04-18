import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);
  console.log("Network:", network.name);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  // 1. Deploy Treasury
  console.log("\n--- Deploying IPredictTreasury ---");
  const Treasury = await ethers.getContractFactory("IPredictTreasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("IPredictTreasury:", treasuryAddress);

  // 2. Deploy Oracle
  console.log("\n--- Deploying IPredictOracle ---");
  const Oracle = await ethers.getContractFactory("IPredictOracle");
  const oracle = await Oracle.deploy();
  await oracle.waitForDeployment();
  const oracleAddress = await oracle.getAddress();
  console.log("IPredictOracle:", oracleAddress);

  // 3. Deploy Core
  console.log("\n--- Deploying IPredictCore ---");
  const Core = await ethers.getContractFactory("IPredictCore");
  const core = await Core.deploy(treasuryAddress, oracleAddress);
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  console.log("IPredictCore:", coreAddress);

  // 4. Deploy Factory
  console.log("\n--- Deploying IPredictMarketFactory ---");
  const Factory = await ethers.getContractFactory("IPredictMarketFactory");
  const factory = await Factory.deploy(coreAddress);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("IPredictMarketFactory:", factoryAddress);

  // 5. Configure oracle -> core
  console.log("\n--- Configuring Oracle ---");
  const oracleContract = await ethers.getContractAt("IPredictOracle", oracleAddress);
  const tx = await oracleContract.setCoreContract(coreAddress);
  await tx.wait();
  console.log("Oracle core contract set");

  // 6. Write deployment info
  const deployment = {
    network: network.name,
    chainId: network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      IPredictTreasury: treasuryAddress,
      IPredictOracle: oracleAddress,
      IPredictCore: coreAddress,
      IPredictMarketFactory: factoryAddress,
    },
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = network.name === "hardhat" ? "localhost.json" : "eth-sepolia.json";
  fs.writeFileSync(
    path.join(deploymentsDir, filename),
    JSON.stringify(deployment, null, 2)
  );
  console.log(`\nDeployment saved to deployments/${filename}`);

  // 7. Verify if VERIFY flag set
  if (process.env.VERIFY === "true" && network.name !== "hardhat") {
    console.log("\n--- Verifying contracts ---");
    const contracts = [
      { address: treasuryAddress, args: [] },
      { address: oracleAddress, args: [] },
      { address: coreAddress, args: [treasuryAddress, oracleAddress] },
      { address: factoryAddress, args: [coreAddress] },
    ];

    for (const c of contracts) {
      try {
        await (globalThis as Record<string, Function>).run("verify:verify", {
          address: c.address,
          constructorArguments: c.args,
        });
      } catch (e: unknown) {
        const err = e as Error;
        console.log(`Verification failed for ${c.address}: ${err.message}`);
      }
    }
  }

  // 8. Summary
  console.log("\n========================================");
  console.log("  iPredict Deployment Summary");
  console.log("========================================");
  console.log(`  Treasury:  ${treasuryAddress}`);
  console.log(`  Oracle:    ${oracleAddress}`);
  console.log(`  Core:      ${coreAddress}`);
  console.log(`  Factory:   ${factoryAddress}`);
  console.log("========================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
