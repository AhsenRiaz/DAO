const hre = require("hardhat");
import { ethers } from "hardhat";

async function main() {
  const Dao = await ethers.getContractFactory("DAO");
  // deploy the contract
  const dao = await Dao.deploy("0xff05aF051AAa442c8c0d8B768EdbB4f2d32A77A4");

  await dao.deployed();

  console.log("Verify Contract Address:", dao.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
