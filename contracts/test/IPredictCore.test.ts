import { expect } from "chai";
import { ethers } from "hardhat";
import { getBlockTimestamp, increaseTime } from "./helpers/fheHelpers";

describe("IPredictCore", function () {
  let treasury: Awaited<ReturnType<typeof deployContracts>>["treasury"];
  let oracle: Awaited<ReturnType<typeof deployContracts>>["oracle"];
  let core: Awaited<ReturnType<typeof deployContracts>>["core"];
  let owner: Awaited<ReturnType<typeof ethers.getSigners>>[0];
  let user1: Awaited<ReturnType<typeof ethers.getSigners>>[0];
  let user2: Awaited<ReturnType<typeof ethers.getSigners>>[0];

  async function deployContracts() {
    const [_owner, _user1, _user2] = await ethers.getSigners();

    const Treasury = await ethers.getContractFactory("IPredictTreasury");
    const _treasury = await Treasury.deploy();
    await _treasury.waitForDeployment();

    const Oracle = await ethers.getContractFactory("IPredictOracle");
    const _oracle = await Oracle.deploy();
    await _oracle.waitForDeployment();

    const Core = await ethers.getContractFactory("IPredictCore");
    const _core = await Core.deploy(await _treasury.getAddress(), await _oracle.getAddress());
    await _core.waitForDeployment();

    await _oracle.setCoreContract(await _core.getAddress());

    return { treasury: _treasury, oracle: _oracle, core: _core };
  }

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const contracts = await deployContracts();
    treasury = contracts.treasury;
    oracle = contracts.oracle;
    core = contracts.core;
  });

  describe("Market Creation", function () {
    it("should create a market with valid params", async function () {
      const now = await getBlockTimestamp();
      const deadline = now + 86400;
      const tx = await core.createMarket("Will ETH hit $5k?", "Crypto", deadline);
      await tx.wait();

      const market = await core.getMarket(0);
      expect(market.question).to.equal("Will ETH hit $5k?");
      expect(market.category).to.equal("Crypto");
      expect(market.status).to.equal(0); // Open
      expect(market.publicTotalPool).to.equal(0);
    });

    it("should reject market with past deadline", async function () {
      const now = await getBlockTimestamp();
      await expect(
        core.createMarket("Test?", "Other", now - 100)
      ).to.be.revertedWith("Deadline must be future");
    });

    it("should reject market with empty question", async function () {
      const now = await getBlockTimestamp();
      await expect(
        core.createMarket("", "Other", now + 86400)
      ).to.be.revertedWith("Empty question");
    });

    it("should reject market with empty category", async function () {
      const now = await getBlockTimestamp();
      await expect(
        core.createMarket("Test?", "", now + 86400)
      ).to.be.revertedWith("Empty category");
    });

    it("should increment market count", async function () {
      const now = await getBlockTimestamp();
      await core.createMarket("Q1?", "Crypto", now + 86400);
      await core.createMarket("Q2?", "Sports", now + 86400);
      expect(await core.getMarketCount()).to.equal(2);
    });
  });

  describe("Category Filtering", function () {
    it("should return markets by category", async function () {
      const now = await getBlockTimestamp();
      await core.createMarket("Q1?", "Crypto", now + 86400);
      await core.createMarket("Q2?", "Sports", now + 86400);
      await core.createMarket("Q3?", "Crypto", now + 86400);

      const cryptoMarkets = await core.getMarketsByCategory("Crypto");
      expect(cryptoMarkets.length).to.equal(2);

      const sportsMarkets = await core.getMarketsByCategory("Sports");
      expect(sportsMarkets.length).to.equal(1);
    });
  });

  describe("Market Resolution", function () {
    it("should reject resolution from non-oracle", async function () {
      const now = await getBlockTimestamp();
      await core.createMarket("Test?", "Other", now + 100);
      await increaseTime(3700 + 100);

      await expect(
        core.connect(user1).resolveMarket(0, true)
      ).to.be.revertedWith("Only oracle");
    });

    it("should reject early resolution", async function () {
      const now = await getBlockTimestamp();
      await core.createMarket("Test?", "Other", now + 86400);

      await expect(
        oracle.setOutcome(0, true)
      ).to.be.revertedWith("Too early to resolve");
    });
  });

  describe("Treasury", function () {
    it("should accept native token fees", async function () {
      const treasuryAddress = await treasury.getAddress();
      const balBefore = await treasury.getBalance(ethers.ZeroAddress);

      await owner.sendTransaction({
        to: treasuryAddress,
        value: ethers.parseEther("1"),
      });

      const balAfter = await treasury.getBalance(ethers.ZeroAddress);
      expect(balAfter).to.be.gt(balBefore);
    });

    it("should only allow owner to withdraw", async function () {
      await expect(
        treasury.connect(user1).withdrawFees(ethers.ZeroAddress, 100)
      ).to.be.reverted;
    });
  });

  describe("Oracle", function () {
    it("should add and remove resolvers", async function () {
      await oracle.addResolver(user1.address);
      expect(await oracle.isResolver(user1.address)).to.be.true;

      await oracle.removeResolver(user1.address);
      expect(await oracle.isResolver(user1.address)).to.be.false;
    });

    it("should reject non-resolver calls", async function () {
      const now = await getBlockTimestamp();
      await core.createMarket("Test?", "Other", now + 100);
      await increaseTime(3700 + 100);

      await expect(
        oracle.connect(user1).setOutcome(0, true)
      ).to.be.revertedWith("Not authorized resolver");
    });
  });
});
