import { ethers } from "hardhat";
import hre from "hardhat";
import { encryptDataField, decryptNodeResponse} from '@swisstronik/swisstronik.js';

const sendShieldedTransaction = async (signer: any, destination: string, data: string, value: number) => {
    const rpclink = hre.network.config.url; 
    const [encryptedData] = await encryptDataField(rpclink, data);
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
      value,
    });
};

async function main() {
    const contractAddress = "0x1673098BdE00E19c4B7b41C595c10f4AbEc4F264";
    const [signer] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("MetanaToken");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "mint";
    const address = "0x311A4fE60Ce691a2148CA916358033555360f345";
    const amount = 100;
    const mintTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [address, amount]), 0);
    await mintTx.wait();
    console.log("Transaction Receipt: ", mintTx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});




