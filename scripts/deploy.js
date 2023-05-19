const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);
  //Get the docminter smart contract object and deploy it
  const DocMinter = await ethers.getContractFactory("DocMinter");
  console.log("Deploying...");
  const Docminter = await DocMinter.deploy();
  console.log("Contract deployed!");
  await Docminter.deployed();
  console.log("Contract deployed successfully!");

  //Pull the address and ABI out while you deploy, since that will be key in interacting with the smart contract later
  const data = {
    address: Docminter.address,
    abi: JSON.parse(Docminter.interface.format("json")),
  };

  //This writes the ABI and address to the marketplace.json
  //This data is then used by frontend files to connect with the smart contract
  fs.writeFileSync("./app/DocMinter.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
