import { ethers } from "hardhat";

// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const PROPOSALS = process.argv.slice(2)
    console.log("Proposals: ");
    PROPOSALS.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    // TODO

    console.log("Deploying Ballot contract...");
    const ballotFactory = await ethers.getContractFactory("Ballot")
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