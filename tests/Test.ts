import { expect } from "chai";
import { ethers } from "hardhat";
import { MetanaToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Basic tests for understanding ERC20", async () => {
  let myContract: MetanaToken;
  let accounts: HardhatEthersSigner[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const myContractFactory = await ethers.getContractFactory(
      "MetanaToken"
    );
    myContract = await myContractFactory.deploy();
    await myContract.waitForDeployment();
  });

  it("should ...", async () => {
    expect(0).to.eq(0);
  });

  
});