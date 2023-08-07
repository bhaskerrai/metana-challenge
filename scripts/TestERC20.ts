import { ethers } from "hardhat";

async function main() {
    const [deployer, account2] = await ethers.getSigners();

    const tokenContractFactory = await ethers.getContractFactory("MyERC20");
    const tokenContract = await tokenContractFactory.deploy();

    await tokenContract.waitForDeployment();

    const tokenContractAddress = await tokenContract.getAddress();
    console.log(tokenContractAddress);

    // Fetching the role code
    const code = await tokenContract.MINTER_ROLE();
    console.log(code);

    // Minting tokens
    const mintTx = await tokenContract.connect(account2).mint(deployer.address, 2);
    await mintTx.wait();

    const myBalance = await tokenContract.balanceOf(deployer.address);
    console.log(`My Balance is ${myBalance.toString()} decimals units`);
    const otherBalance = await tokenContract.balanceOf(account2.address);
    console.log(`The Balance of Account2 is ${otherBalance.toString()} decimals units`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
