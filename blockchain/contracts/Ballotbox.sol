// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Ballotbox is Initializable {

    address DAO;
    uint256 subscriptionCost;

    struct question {
        address agent1;
        string CID;
    }

    struct request {
        address agent3;
        string CID;
        uint256 subscriptionValue;
    }

    mapping (string => question) public questionLedger;
    mapping (string => request) public requestLedger;

    event emitNewQuestion(
        address agent1,
        string CID
    );

    event emitDataRequest (
        address agent3,
        string CID
    );

    function Initialize ()
        public
        initializer
    {
        DAO = msg.sender;
        subscriptionCost = 100;
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
    
        emit emitNewQuestion(msg.sender, CID);
        return true;
    }

    // TODO - zk functions for agent 2

    function newRequest (
        string memory CID
    ) 
        public
        payable
        returns (bool) 
    {
        require(msg.value >= subscriptionCost, "payment error");

        request storage thisRequest = requestLedger[CID];
        thisRequest.agent3 = msg.sender;
        thisRequest.CID = CID;
        thisRequest.subscriptionValue = msg.value;

        payable(DAO).transfer(msg.value);
        
        emit emitDataRequest(msg.sender, CID);
        return true;
    }

    function deposit() public payable {}
}