import { createSlice } from "@reduxjs/toolkit";
import { DAO } from "../../../types/ethers-contracts/index";

interface IInitialState {
  daoContract: DAO | null;
}

const initialState: IInitialState = {
  daoContract: null,
};

const loadContracts = createSlice({
  name: "LoadContracts",
  initialState,
  reducers: {
    loadContract(state, action) {
      const {
        payload: { daoContract },
      } = action;
      if (daoContract) {
        state.daoContract = daoContract;
      }
    },
  },
});

export const loadContractsReducer = loadContracts.reducer;
export const { loadContract } = loadContracts.actions;
