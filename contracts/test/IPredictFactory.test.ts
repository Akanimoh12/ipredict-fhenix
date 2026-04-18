import { expect } from "chai";
import { ethers } from "hardhat";
import { getBlockTimestamp } from "./helpers/fheHelpers";

describe("IPredictMarketFactory", function () {
  let factory: Awaited<ReturnType<typeof deploy>>["factory"];
  let core: Awaited<ReturnType<typeof deploy>>["core"];
  let owner: Awaited<ReturnType<typeof ethers.getSigners>>[0];
  let user1: Awaited<ReturnType<typeof ethers.getSigners>>[0];

  async function deploy() {
    const [_owner] = await ethers.getSigners();

    const Treasury = await ethers.getContractFactory("IPredictTreasury");
    const treasury = await Treasury.deploy();
    await treasury.waitForDeployment();

    const Oracle = await ethers.getContractFactory("IPredictOracle");
    const oracle = await Oracle.deploy();
    await oracle.waitForDeployment();

    const Core = await ethers.getContractFactory("IPredictCore");
    const _core = await Core.deploy(await treasury.getAddress(), await oracle.getAddress());
    await _core.waitForDeployment();

    const Factory = await ethers.getContractFactory("IPredictMarketFactory");
    const _factory = await Factory.deploy(await _core.getAddress());
    await _factory.waitForDeployment();

    return { factory: _factory, core: _core, treasury, oracle };
  }

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    const contracts = await deploy();
    factory = contracts.factory;
    core = contracts.core;
  });

  it("should deploy with correct core address", async function () {
    expect(await factory.coreContract()).to.equal(await core.getAddress());
  });

  it("should track deployed markets", async function () {
    const now = await getBlockTimestamp();
    await factory.createMarket("Test?", "Crypto", now + 86400);

    const markets = await factory.getDeployedMarkets();
    expect(markets.length).to.equal(1);
  });

  it("should only allow owner to change core", async function () {
    await expect(
      factory.connect(user1).setCoreContract(ethers.ZeroAddress)
    ).to.be.reverted;
  });

  it("should reject zero address core", async function () {
    await expect(
      factory.setCoreContract(ethers.ZeroAddress)
    ).to.be.revertedWith("Invalid core");
  });
});
