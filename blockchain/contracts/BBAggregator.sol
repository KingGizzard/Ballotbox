// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BBAggregator {
    //pollID - count of YES
    mapping(uint256 => uint256) public pollYes;
    mapping(uint256 => uint256) public pollNo;

    mapping(uint256 => string) public pollValue;

    function getContractName() public pure returns (string memory) {
        return "BlackBoxAggregator Oracle";
    }

    //Get YES/NO count for the Particular Poll
    function getPollBoolean(
        uint256 pollID
    ) public view returns (uint256, uint256) {
        return (pollYes[pollID], pollNo[pollID]);
    }

    function getPollValue(uint256 pollID) public view returns (string memory) {
        return pollValue[pollID];
    }

    function updatePollBoolean(uint256 pollId, uint256 pollAnswer) public {
        if (pollAnswer == 1) {
            pollYes[pollId] += 1;
        } else {
            pollNo[pollId] += 1;
        }
    }

    function updatePollValue(uint256 pollId, string memory pollAnswer) public {
        pollValue[pollId] = pollAnswer;
    }

    // other types of Polls would be some type of content which can be stored in IPFS/Filecoin and the CID
    // will be only stored in this contract for that PollId
}
