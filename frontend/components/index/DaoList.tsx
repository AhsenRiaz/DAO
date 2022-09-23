import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { DAO } from "../../types/ethers-contracts";
import Dao from "./Dao";

export type DaoList = {
  title: string;
  description: string;
  id: string;
}[];

const DaoList = () => {
  const { daoContract } = useAppSelector((state) => state.loadContractsReducer);

  const [daoProposals, setDaoProposals] = useState<DAO.ProposalStructOutput[]>(
    []
  );

  const getProposalCount = async () => {
    try {
      if (daoContract) {
        let proposalCount: string | number = await (
          await daoContract.getNextProposal()
        )._hex;
        proposalCount = parseInt(proposalCount);
        console.log("proposal count", proposalCount);
        return proposalCount;
      }
    } catch (error) {
      console.log("Error in getting proposal count", error);
    }
  };

  const getAllProposals = async () => {
    let proposals = [];
    try {
      if (daoContract) {
        let proposalCount = await getProposalCount();
        if (proposalCount) {
          for (let i = 1; i < proposalCount; i++) {
            let proposal = await daoContract.getProposal(i);
            proposals.push(proposal);
          }
          if (proposals.length > 0) {
            setDaoProposals(proposals);
          }
        } else {
          throw "Error: No proposal count";
        }
      } else {
        throw "Error: No Dao Contract";
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProposals();
  }, [daoContract]);

  useEffect(() => {}, [daoProposals]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Dao daoProposals={daoProposals} />
    </div>
  );
};

export default DaoList;
