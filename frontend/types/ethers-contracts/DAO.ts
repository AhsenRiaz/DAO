/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace DAO {
  export type ProposalStruct = {
    id: PromiseOrValue<BigNumberish>;
    proposedBy: PromiseOrValue<string>;
    title: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    deadline: PromiseOrValue<BigNumberish>;
    voteUp: PromiseOrValue<BigNumberish>;
    voteDown: PromiseOrValue<BigNumberish>;
    maxVotes: PromiseOrValue<BigNumberish>;
    canVote: PromiseOrValue<string>[];
    voteCounted: PromiseOrValue<boolean>;
    exists: PromiseOrValue<boolean>;
    passed: PromiseOrValue<boolean>;
  };

  export type ProposalStructOutput = [
    BigNumber,
    string,
    string,
    string,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    string[],
    boolean,
    boolean,
    boolean
  ] & {
    id: BigNumber;
    proposedBy: string;
    title: string;
    description: string;
    deadline: number;
    voteUp: BigNumber;
    voteDown: BigNumber;
    maxVotes: BigNumber;
    canVote: string[];
    voteCounted: boolean;
    exists: boolean;
    passed: boolean;
  };
}

export interface DAOInterface extends utils.Interface {
  functions: {
    "checkVotingEligibility(uint256,address)": FunctionFragment;
    "countVotes(uint256)": FunctionFragment;
    "createProposal(string,string,uint32,address[])": FunctionFragment;
    "getContractOwner()": FunctionFragment;
    "getNextProposal()": FunctionFragment;
    "getProposal(uint256)": FunctionFragment;
    "nft()": FunctionFragment;
    "voteOnProposal(uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkVotingEligibility"
      | "countVotes"
      | "createProposal"
      | "getContractOwner"
      | "getNextProposal"
      | "getProposal"
      | "nft"
      | "voteOnProposal"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkVotingEligibility",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "countVotes",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createProposal",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNextProposal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "nft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "voteOnProposal",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkVotingEligibility",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "countVotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "voteOnProposal",
    data: BytesLike
  ): Result;

  events: {
    "ProposalCounted(uint256,bool)": EventFragment;
    "ProposalCreated(uint256,string,uint256,address)": EventFragment;
    "ProposalVoted(uint256,address,uint256,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProposalCounted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalVoted"): EventFragment;
}

export interface ProposalCountedEventObject {
  id: BigNumber;
  passed: boolean;
}
export type ProposalCountedEvent = TypedEvent<
  [BigNumber, boolean],
  ProposalCountedEventObject
>;

export type ProposalCountedEventFilter = TypedEventFilter<ProposalCountedEvent>;

export interface ProposalCreatedEventObject {
  id: BigNumber;
  title: string;
  maxVotes: BigNumber;
  proposer: string;
}
export type ProposalCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  ProposalCreatedEventObject
>;

export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;

export interface ProposalVotedEventObject {
  id: BigNumber;
  voter: string;
  voteUp: BigNumber;
  voteDown: BigNumber;
  votedFor: boolean;
}
export type ProposalVotedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, boolean],
  ProposalVotedEventObject
>;

export type ProposalVotedEventFilter = TypedEventFilter<ProposalVotedEvent>;

export interface DAO extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DAOInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    checkVotingEligibility(
      _id: PromiseOrValue<BigNumberish>,
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    countVotes(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createProposal(
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _deadline: PromiseOrValue<BigNumberish>,
      _canVote: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getContractOwner(overrides?: CallOverrides): Promise<[string]>;

    getNextProposal(overrides?: CallOverrides): Promise<[BigNumber]>;

    getProposal(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[DAO.ProposalStructOutput]>;

    nft(overrides?: CallOverrides): Promise<[string]>;

    voteOnProposal(
      _id: PromiseOrValue<BigNumberish>,
      _vote: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkVotingEligibility(
    _id: PromiseOrValue<BigNumberish>,
    _voter: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  countVotes(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createProposal(
    _title: PromiseOrValue<string>,
    _description: PromiseOrValue<string>,
    _deadline: PromiseOrValue<BigNumberish>,
    _canVote: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getContractOwner(overrides?: CallOverrides): Promise<string>;

  getNextProposal(overrides?: CallOverrides): Promise<BigNumber>;

  getProposal(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<DAO.ProposalStructOutput>;

  nft(overrides?: CallOverrides): Promise<string>;

  voteOnProposal(
    _id: PromiseOrValue<BigNumberish>,
    _vote: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkVotingEligibility(
      _id: PromiseOrValue<BigNumberish>,
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    countVotes(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createProposal(
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _deadline: PromiseOrValue<BigNumberish>,
      _canVote: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    getContractOwner(overrides?: CallOverrides): Promise<string>;

    getNextProposal(overrides?: CallOverrides): Promise<BigNumber>;

    getProposal(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<DAO.ProposalStructOutput>;

    nft(overrides?: CallOverrides): Promise<string>;

    voteOnProposal(
      _id: PromiseOrValue<BigNumberish>,
      _vote: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProposalCounted(uint256,bool)"(
      id?: null,
      passed?: null
    ): ProposalCountedEventFilter;
    ProposalCounted(id?: null, passed?: null): ProposalCountedEventFilter;

    "ProposalCreated(uint256,string,uint256,address)"(
      id?: null,
      title?: null,
      maxVotes?: null,
      proposer?: null
    ): ProposalCreatedEventFilter;
    ProposalCreated(
      id?: null,
      title?: null,
      maxVotes?: null,
      proposer?: null
    ): ProposalCreatedEventFilter;

    "ProposalVoted(uint256,address,uint256,uint256,bool)"(
      id?: null,
      voter?: null,
      voteUp?: null,
      voteDown?: null,
      votedFor?: null
    ): ProposalVotedEventFilter;
    ProposalVoted(
      id?: null,
      voter?: null,
      voteUp?: null,
      voteDown?: null,
      votedFor?: null
    ): ProposalVotedEventFilter;
  };

  estimateGas: {
    checkVotingEligibility(
      _id: PromiseOrValue<BigNumberish>,
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    countVotes(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createProposal(
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _deadline: PromiseOrValue<BigNumberish>,
      _canVote: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getContractOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getNextProposal(overrides?: CallOverrides): Promise<BigNumber>;

    getProposal(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nft(overrides?: CallOverrides): Promise<BigNumber>;

    voteOnProposal(
      _id: PromiseOrValue<BigNumberish>,
      _vote: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkVotingEligibility(
      _id: PromiseOrValue<BigNumberish>,
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    countVotes(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createProposal(
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _deadline: PromiseOrValue<BigNumberish>,
      _canVote: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getContractOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNextProposal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProposal(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    voteOnProposal(
      _id: PromiseOrValue<BigNumberish>,
      _vote: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
