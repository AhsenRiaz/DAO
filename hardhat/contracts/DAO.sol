// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;
import "./INFT.sol";

/**
 * @title DAO
 */

contract DAO {
    INFT public nft;

    address private _owner;
    uint private nextProposal;

    constructor(address _nft) {
        nft = INFT(_nft);
        nextProposal = 1;
        _owner = msg.sender;
    }

    struct Proposal {
        uint id;
        address proposedBy;
        string title;
        string description;
        uint32 deadline;
        uint256 voteUp;
        uint256 voteDown;
        uint256 maxVotes;
        address[] canVote;
        bool voteCounted;
        bool exists;
        bool passed;
    }

    mapping(uint => mapping(address => bool)) voteStatus;

    mapping(uint => Proposal) private proposals;

    event ProposalCreated(
        uint id,
        string title,
        uint256 maxVotes,
        address proposer
    );

    event ProposalVoted(
        uint id,
        address voter,
        uint256 voteUp,
        uint256 voteDown,
        bool votedFor
    );

    event ProposalCounted(uint id, bool passed);

    modifier validAddress() {
        require(msg.sender != address(0), "DAO: invalid address");
        _;
    }

    /**
     * @notice caller should hold an nft from the collection
     * @dev create proposal
     * @param _title (type string) - name of proposal
     * @param _description (type string) - description of proposal
     * @param _canVote (type address[]) - array of address allowed to vote
     */
    function createProposal(
        string memory _title,
        string memory _description,
        uint32 _deadline,
        address[] memory _canVote
    ) external validAddress {
        address proposer = msg.sender;
        require(
            checkProposalEligibility(proposer),
            "DAO: only nft holder can propose"
        );
        Proposal storage newProposal = proposals[nextProposal];
        require(newProposal.id == 0, "DAO: proposal already exists");
        newProposal.id = nextProposal;
        newProposal.title = _title;
        newProposal.proposedBy = proposer;
        newProposal.description = _description;
        newProposal.deadline = uint32(block.timestamp) + _deadline;
        newProposal.maxVotes = _canVote.length;
        newProposal.canVote = _canVote;
        newProposal.exists = true;

        emit ProposalCreated(nextProposal, _title, _canVote.length, proposer);
        nextProposal++;
    }

    /**
     * @notice caller must hold an nft from the collection
     * @notice _vote will be true if vote for else false
     * @dev vote on the created proposal
     * @param _id (type uint256) - id of the proposal
     * @param _vote (type bool) - wheather to vote or note
     */
    function voteOnProposal(uint256 _id, bool _vote) external validAddress {
        require(proposals[_id].exists == true, "DAO: proposal does not exist");

        require(voteStatus[_id][msg.sender] == false, "DAO: already voted");
        require(
            block.timestamp <= proposals[_id].deadline,
            "DAO: voting time ended"
        );

        Proposal storage proposal = proposals[_id];
        if (_vote == true) {
            proposal.voteUp++;
        } else {
            proposal.voteDown++;
        }

        voteStatus[_id][msg.sender] = true;
    }

    /**
     * @dev count all the votes
     * @param _id (type uint256) - id of the proposal
     */
    function countVotes(uint256 _id) public {
        Proposal storage proposal = proposals[_id];

        require(msg.sender == proposal.proposedBy, "DAO: only owner can call");
        require(proposal.exists == true, "DAO: proposal does not exist");
        require(
            block.timestamp > proposal.deadline,
            "DAO: deadline not finished"
        );
        require(!proposal.voteCounted, "DAO: Vote counted");

        if (proposal.voteUp > proposal.voteDown) {
            proposal.passed = true;
        }
        proposal.voteCounted = true;

        emit ProposalCounted(_id, proposal.passed);
    }

    /**
     * @dev get the contract owner
     */
    function getContractOwner() public view validAddress returns (address) {
        return _owner;
    }

    /**
     * @dev get proposal
     * @param _id (type uin256)
     * @return proposal based on its id
     */
    function getProposal(uint256 _id)
        public
        view
        validAddress
        returns (Proposal memory)
    {
        return proposals[_id];
    }

    /**
     * @dev get proposal count
     * @return total proposal count
     */
    function getNextProposal() public view returns (uint256) {
        return nextProposal;
    }

    function checkProposalEligibility(address _proposer)
        private
        view
        returns (bool)
    {
        uint256 balance = nft.balanceOf(_proposer);
        if (balance > 0) {
            return true;
        }
        return false;
    }

    function checkVotingEligibility(uint _id, address _voter)
        external
        view
        returns (bool)
    {
        for (uint i = 1; i <= proposals[_id].canVote.length; i++) {
            if (proposals[_id].canVote[i] == _voter) {
                return true;
            }
        }
        return false;
    }
}
