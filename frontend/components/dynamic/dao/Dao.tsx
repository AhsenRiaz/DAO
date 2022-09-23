import { FC, useEffect, useState } from "react";
import { Button, Container, Text } from "@nextui-org/react";
import { useAppSelector } from "../../../redux/store";
import { DAO } from "../../../types/ethers-contracts";
import { useWeb3React } from "@web3-react/core";
import Deadline from "../../../components/Deadline";

interface IDao {
  id: string | string[] | undefined;
}

const Dao: FC<IDao> = ({ id }) => {
  const { daoContract } = useAppSelector((state) => state.loadContractsReducer);
  const { account } = useWeb3React();

  const [loading, setLoading] = useState<boolean>(false);

  const [proposal, setProposal] = useState<DAO.ProposalStructOutput | null>(
    null
  );

  const getDaoProposal = async () => {
    try {
      if (daoContract) {
        let result = await daoContract.getProposal(id as string);
        setProposal(result);
      }
    } catch (error) {
      console.log("Error in getting dao proposal", error);
    }
  };

  const checkVotingEligibility = async (id: number, account: string) => {
    try {
      if (daoContract) {
        let eligible = await daoContract.checkVotingEligibility(
          id,
          account.toLowerCase()
        );
        return eligible;
      }
    } catch (error) {}
  };

  const countVotes = async () => {
    try {
      if (daoContract && proposal) {
        let id: string | number = proposal.id._hex;
        id = parseInt(id);
        let eligible = await daoContract.countVotes(id);
      }
    } catch (error) {}
  };

  const voteOnProposal = async (vote: boolean) => {
    try {
      if (daoContract && proposal) {
        setLoading(true);
        let id: string | number = proposal.id._hex;
        id = parseInt(id);
        // let eligible = await checkVotingEligibility(id, account as string);
        // if (!eligible) {
        //   throw "Not eligible";
        // }
        let transaction = await daoContract.voteOnProposal(id.toString(), vote);
        let receipt = await transaction.wait();
        if (receipt) {
          console.log("receipt", receipt);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("Error while voting proposal", error);
    }
  };

  useEffect(() => {
    getDaoProposal();
  }, []);

  useEffect(() => {}, [daoContract, account]);

  return (
    <Container lg>
      {proposal && (
        <>
          <Text css={{ color: "$headingFontColor" }} h2>
            {proposal.title}
          </Text>
          <Text css={{ color: "$descriptionFontColor" }} h4>
            Proposer {proposal.proposedBy}
          </Text>
          <Text css={{ color: "$descriptionFontColor" }} h4>
            {proposal.description}
          </Text>
          <Text css={{ color: "$descriptionFontColor" }} h6>
            Vote For Dao
          </Text>
          <Button
            disabled={proposal.passed}
            onClick={() => voteOnProposal(true)}
            color={"gradient"}
          >
            Vote For
          </Button>
          <Button
            onClick={() => voteOnProposal(false)}
            css={{ marginTop: "3rem" }}
            color={"gradient"}
            disabled={proposal.passed}
          >
            Vote Against
          </Button>

          <Text
            css={{
              marginTop: "2rem",
              color: "$descriptionFontColor",
              fontWeight: "bold",
            }}
          >
            Can Vote
          </Text>
          {proposal.canVote.map((voter, i) => {
            return (
              <Text
                key={i}
                css={{
                  color: "$descriptionFontColor",
                  fontWeight: "$light",
                }}
              >
                {voter}
              </Text>
            );
          })}
          <Deadline endTime={proposal.deadline} />
          <Text css={{ color: "$descriptionFontColor" }}>
            Vote For: {parseInt(proposal.voteUp._hex)}
          </Text>
          <Text css={{ color: "$descriptionFontColor" }}>
            Vote Against: {parseInt(proposal.voteDown._hex)}
          </Text>
          <Button disabled={proposal.passed} onClick={() => countVotes()}>
            Count Votes
          </Button>
          <Text css={{ marginTop: "2rem", color: "$descriptionFontColor" }} h6>
            Status:
            {proposal.voteCounted === true
              ? proposal.passed
                ? " Passed"
                : " Rejected"
              : " Pending"}
          </Text>
        </>
      )}
    </Container>
  );
};

export default Dao;
