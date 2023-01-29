// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphoreVoting.sol";
import "@semaphore-protocol/contracts/extensions/SemaphoreVoting.sol";

contract Ballotbox {

    ISemaphoreVoting semaphoreVoting;

    struct question {
        address agent1;
        string CID;
    }

    struct answer {
        string CID;
    }

    struct request {
        string CID;
        string email;
    }

    mapping (string => question) public questionLedger;
    mapping (string => answer) public answerLedger;
    mapping (string => request) public requestLedger;

    string currentCID;
    request currentRequest;
    bool pollIsActive;
    uint256 resultTrue;
    uint256 resultFalse;

    event emitNewQuestion(address agent1, string CID);
    event emitNewRequest(address agent3, string CID, string email);
    event emitPollStarted(string CID);
    event emitPollFinished(string CID, bool result);

    constructor (ISemaphoreVoting.Verifier[] memory _verifiers)
    {
        semaphoreVoting = new SemaphoreVoting(_verifiers);
        currentCID = "";
        pollIsActive = false;
    }

    ///
    /// Agent 1 functionality
    ///

    function newQuestionBallotbox (
        string memory CID
    ) 
        public returns (bool) 
    {
        require(pollIsActive == false, "Please ask your question after the next round");
        question storage thisQuestion = questionLedger[CID];
        thisQuestion.agent1 = msg.sender;
        thisQuestion.CID = CID;
        currentCID = CID;
        emit emitNewQuestion(msg.sender, CID);
        return true;
    }

    ///
    /// Agent 2 anon-voting functionality
    ///

    function createPollBallotbox(
        uint256 pollId,
        uint256 merkleTreeDepth
    ) public {
        semaphoreVoting.createPoll(pollId, address(this), merkleTreeDepth);
        pollIsActive = true;
    }

    function addVoterBallotbox(
        uint256 pollId, 
        uint256 identityCommitment
    ) public {
        semaphoreVoting.addVoter(pollId, identityCommitment);
    }

    function startPollBallotbox(
        uint256 pollId, 
        uint256 encryptionKey
    ) public {
        semaphoreVoting.startPoll(pollId, encryptionKey);
        emit emitPollStarted(currentCID);
    }

    function castVoteBallotbox(
        bytes32 vote,
        uint256 nullifierHash,
        uint256 pollId,
        uint256[8] calldata proof
    ) public {
        semaphoreVoting.castVote(vote, nullifierHash, pollId, proof);
    }

    function endPollBallotbox(
        uint256 pollId, 
        uint256 decryptionKey
    ) public {
        semaphoreVoting.endPoll(pollId, decryptionKey);
        bool tempResult = resultTrue > resultFalse;
        pollIsActive = false;
        emit emitPollFinished(currentCID, tempResult);
    }

    ///
    /// Agent 3 functionality
    ///

    function requestData(
        string memory CID, 
        string memory email
    ) 
        public returns (bool) 
    {
        request storage thisRequest = requestLedger[CID];
        thisRequest.CID = CID;
        thisRequest.email = email;
        currentRequest = thisRequest;
        emit emitNewRequest(msg.sender, CID, email);
        return true;  
    }

    ///
    /// general utils
    ///

    function getQuestion() 
        public view returns (string memory) 
    {
        return currentCID;
    }

    function getRequest()
        public view returns (request memory)
    {
        return currentRequest;
    }

    function deposit() public payable {}
}