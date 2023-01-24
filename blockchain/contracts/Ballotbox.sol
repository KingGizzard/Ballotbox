// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";

contract Ballotbox is SemaphoreCore, SemaphoreGroups {

    IVerifier public verifier;

    mapping(uint256 => bytes32) users;

    uint256 groupId;

    string currentCID;

    struct question {
        address agent1;
        string CID;
    }

    struct answer {
        string CID;
    }

    mapping (string => question) public questionLedger;
    mapping (string => answer) public answerLedger;

    event emitNewQuestion(
        address agent1,
        string CID
    );

    event emitNewAnswer(
        bytes32 feedback
    );

    event emitNewMember(
        uint256 identityCommitment, 
        bytes32 username
    );

    constructor (address _verifier, uint256 _groupId)
    {
        currentCID = "";

        verifier = IVerifier(_verifier);
        // using verifier 20
        _createGroup(_groupId, 20, 0);
        groupId = _groupId;
    }

    function joinGroup(uint256 identityCommitment, bytes32 username) external {
        _addMember(groupId, identityCommitment);
        users[identityCommitment] = username;
        emit emitNewMember(identityCommitment, username);
    }

    function newQuestion (
        string memory CID
    ) 
        public 
        returns (bool) 
    {
        question storage thisQuestion = questionLedger[CID];
        thisQuestion.agent1 = msg.sender;
        thisQuestion.CID = CID;
        currentCID = CID;
        emit emitNewQuestion(msg.sender, CID);
        return true;
    }

    function newAnswer(
        string memory answerCID,
        bytes32 feedback,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external {
        _verifyProof(feedback, merkleTreeRoot, nullifierHash, externalNullifier, proof, verifier);

        answer storage thisAnswer = answerLedger[currentCID];
        thisAnswer.CID = answerCID;
        emit emitNewAnswer(feedback);
    }

    // TODO - agent 3 functionality

    function getQuestion() 
        public view
        returns (string memory) 
    {
        return currentCID;
    }

    function deposit() public payable {}
}