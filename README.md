# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# To verify contract 

Either call the verify function from utils/verify.ts

or run this command on terminal 
``` yarn hardhat verify --network sepolia contractAddress --constructor-args "arg1,arg2,arg3" ```
