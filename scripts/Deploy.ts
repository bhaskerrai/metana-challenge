import { ethers } from "hardhat";

async function main() {
    const [deployer, account2] = await ethers.getSigners();

    const tokenContractFactory = await ethers.getContractFactory("MetanaToken");
    const tokenContract = await tokenContractFactory.deploy();

    await tokenContract.waitForDeployment();

    // const tokenContractAddress = await tokenContract.getAddress();
    console.log(`Swisstronik token contract deployed to ${tokenContract.target}`);

}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
