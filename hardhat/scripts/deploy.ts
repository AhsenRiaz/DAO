const hre = require("hardhat");
import { ethers } from "hardhat";

async function main() {
  const Dao = await ethers.getContractFactory("DAO");
  // deploy the contract
  const dao = await Dao.deploy("0x922b06cb1d709d570ab0fee31639a6d7322d01b2");

  await dao.deployed();

  console.log("Verify Contract Address:", dao.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
