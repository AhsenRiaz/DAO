import { HardhatUserConfig } from "hardhat/config";
require('hardhat-docgen');
import "@nomicfoundation/hardhat-toolbox";

const config:any = {
  solidity: "0.8.17",
  paths:{
    artifacts:'../frontend/ABIs'
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  }
  
};

export default config;