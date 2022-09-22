/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { INFT, INFTInterface } from "../INFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class INFT__factory {
  static readonly abi = _abi;
  static createInterface(): INFTInterface {
    return new utils.Interface(_abi) as INFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): INFT {
    return new Contract(address, _abi, signerOrProvider) as INFT;
  }
}