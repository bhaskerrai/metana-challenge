import { ethers } from "ethers";
import { Ballot__factory } from '../typechain-types';

import * as dotenv from 'dotenv';
dotenv.config();

// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function setupProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

async function main() {
    const PROPOSALS = process.argv.slice(2)
    console.log("Proposals: ");
    PROPOSALS.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    // TODO

    const provider = setupProvider()
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider)

    const balanceBN  = await provider.getBalance(wallet.address)
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }
    

    console.log("Deploying Ballot contract...");
    const ballotFactory = new Ballot__factory(wallet)
    const ballotContract = await ballotFactory.deploy(PROPOSALS.map(ethers.encodeBytes32String));
    await ballotContract.waitForDeployment();
    const address = await ballotContract.getAddress();

    console.log(`Deployed contract at ${address}`);

    for(let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        const name = ethers.decodeBytes32String(proposal.name)
        console.log(i, name, proposal)
    }



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});