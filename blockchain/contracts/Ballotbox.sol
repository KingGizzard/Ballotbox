// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphoreVoting.sol";

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
    bool isPoll;
    uint256 resultTrue;
    uint256 resultFalse;

    event emitNewQuestion(address agent1, string CID);
    event emitNewRequest(address agent3, string CID, string email);
    event emitPollStarted(string CID);
    event emitPollFinished(string CID, bool result);

    modifier isPollActive(bool pollStatus) {
        require(isPoll == pollStatus, "Please ask your question when the poll is in the correct status");
        _;
    }

    constructor (address _semaphoreVoting)
    {
        semaphoreVoting = ISemaphoreVoting(_semaphoreVoting);
        currentCID = "";
        isPoll = false;
    }

    ///
    /// Agent 1 functionality
    ///

    function newQuestionBallotbox (
        string memory CID
    ) 
        public isPollActive(false) returns (bool) 
    {
        isPoll = true;
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
        address coordinator,
        uint256 merkleTreeDepth
    ) external isPollActive(false) {
        semaphoreVoting.createPoll(pollId, coordinator, merkleTreeDepth);
    }

    function addVoterBallotbox(
        uint256 pollId, 
        uint256 identityCommitment
    ) external isPollActive(true) {
        semaphoreVoting.addVoter(pollId, identityCommitment);
    }

    function startPollBallotbox(
        uint256 pollId, 
        uint256 encryptionKey
    ) external isPollActive(true) {
        semaphoreVoting.startPoll(pollId, encryptionKey);
        emit emitPollStarted(currentCID);
    }

    function castVoteBallotbox(
        uint256 vote,
        uint256 nullifierHash,
        uint256 pollId,
        uint256[8] calldata proof
    ) external isPollActive(true) {
        require(vote == 1 || vote == 0, 'Please vote 1, or 0');
        if(vote == 1){
            resultTrue++;
        } if(vote == 0) {
            resultFalse++;
        }
        semaphoreVoting.castVote(bytes32(vote), nullifierHash, pollId, proof);
    }

    function endPollBallotbox(
        uint256 pollId, 
        uint256 decryptionKey
    ) external isPollActive(true) {
        semaphoreVoting.endPoll(pollId, decryptionKey);
        isPoll = false;
        bool tempResult = resultTrue > resultFalse;
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