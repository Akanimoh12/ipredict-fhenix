import { ethers } from "hardhat";

export async function getBlockTimestamp(): Promise<number> {
  const block = await ethers.provider.getBlock("latest");
  return block?.timestamp ?? Math.floor(Date.now() / 1000);
}

export async function increaseTime(seconds: number): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

export function encodeFakeEncryptedAmount(value: number): string {
  return ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [value]);
}
