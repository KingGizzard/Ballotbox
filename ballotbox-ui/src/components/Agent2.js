import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Identity } from "@semaphore-protocol/identity"
import TxLink from "./TxLink";
import { formatBytes32String } from "@ethersproject/strings";
//import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { Group } from "@semaphore-protocol/group";
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

const Agent2 = (props) => {
  const { address, ballotboxContract, ballotboxAddress, setTxHashes, txHashes, web3 } = props;

  const [pollId, setPollId] = useState(null);
  const [pollIdConfirmed, setPollIdConfirmed] = useState(null);

  const [dummyVoterIndex, setDummyVoterIndex] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [vote, setVote] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState(null);

  const [addVoterHash, setAddVoterHash] = useState(null);
  const [addVoterConfirmed, setAddVoterConfirmed] = useState(false);
  const [startPollHash, setStartPollHash] = useState(null);
  const [startPollConfirmed, setStartPollConfirmed] = useState(false);
  const [castVoteHash, setCastVoteHash] = useState(null);
  const [castVoteConfirmed, setCastVoteConfirmed] = useState(false);
  const [endPollHash, setEndPollHash] = useState(null);
  const [endPollConfirmed, setEndPollConfirmed] = useState(false);

  const transaction = {
    from: address,
    to: ballotboxAddress,
    // gasLimit: 10000000
  }

  const checkTx = async (hash) => {
    const receipt = await web3.eth.getTransactionReceipt(hash);
    if (receipt) {
      if (receipt.blockNumber) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (addVoterHash && !addVoterConfirmed) {
        checkTx(addVoterHash).then((status) => {
          if (status) {
            setAddVoterHash(null);
          }
        })
      }
      if (startPollHash && !startPollConfirmed) {
        checkTx(startPollHash).then((status) => {
          if (status) {
            setStartPollConfirmed(true);
          }
        })
      }
      if (castVoteHash && !castVoteConfirmed) {
        checkTx(castVoteHash).then((status) => {
          if (status) {
            setCastVoteConfirmed(true);
          }
        })
      }
      if (endPollHash && !endPollConfirmed) {
        checkTx(endPollHash).then((status) => {
          if (status) {
            setEndPollConfirmed(true);
          }
        })
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [addVoterHash, addVoterConfirmed, startPollHash, startPollConfirmed, castVoteHash, castVoteConfirmed, endPollHash, endPollConfirmed]);

  const addVoter = async () => {
    if (addVoterHash) return;
    const identity = new Identity(dummyVoterIndex.toString());

    await ballotboxContract.methods.addVoterBallotbox(BigInt(pollId), identity.commitment).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setAddVoterConfirmed(false);
          setAddVoterHash(hash);
        }
      }
    )
  }

  const startPoll = async () => {
    if (startPollHash) return;
    await ballotboxContract.methods.startPollBallotbox(BigInt(pollId), BigInt(encryptionKey)).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setStartPollConfirmed(false);
          setStartPollHash(hash);
        }
      }
    )
  }

  const castVote = async () => {
    if (castVoteHash) return;

    const dummyIdentityArray = [0, 1];
    const dummyVoter = 0;

    var identities = [];
    for (var i in dummyIdentityArray) {
        identities.push((new Identity(i)).commitment);
    }
    const identity = new Identity(String(dummyVoter));
    const group = new Group(20);
    group.addMembers(identities);

  const signal = formatBytes32String(vote);
    const externalNullifier = BigInt(pollId);
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../pse/semaphore20.zkey",
        wasmFilePath: "../pse/semaphore20.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    const nullifierHash = fullProof.publicSignals.nullifierHash;
    
    await ballotboxContract.method.castVoteBallotbox(vote, nullifierHash, externalNullifier, solidityProof).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setCastVoteConfirmed(false);
          setCastVoteHash(hash);
        }
      }
    )
    return;
  }

  const endPoll = async () => {
    if (endPollHash) return;
    await ballotboxContract.methods.endPollBallotbox(BigInt(pollId), decryptionKey).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setEndPollConfirmed(false);
          setEndPollHash(hash);
        }
      }
    );
  }

  return (
    <div className="m-auto flex flex-col gap-6 my-8 w-1/2">
      {
        !address ? 
          <h1 className="text-xl">Connect wallet to add voters, start poll, cast a vote, or end a poll</h1>
        :
          <div className="">
            <div>1. Enter poll ID</div>
            <input onChange={(e) => setPollId(e.target.value)} />
            <Button text='Confirm' onClick={() => setPollIdConfirmed(true)} />
            { pollIdConfirmed &&
              <div className="my-8 flex flex-col gap-3">
                <div>
                  <p>2. Enter dummy voter index to add voter</p>
                  <input onChange={(e) => setDummyVoterIndex(e.target.value)} /> 
                  <Button text='add voter' onClick={addVoter} loading={addVoterHash && !addVoterConfirmed} />
                  <TxLink txHash={addVoterHash} />
                </div>                
                <div>
                  <p>3. Enter encryption key to start poll, you can&apos;t add more voters so be sure to add them before you start.</p>
                  <input onChange={(e) => setEncryptionKey(e.target.value)} />
                  <Button text='start poll' onClick={startPoll} loading={startPollHash && !startPollConfirmed} />
                  <TxLink txHash={startPollHash} />
                </div>
                {/*<div>
                  <p>4. Enter your vote</p>
                  <input onChange={(e) => setVote(e.target.value)} />
                  <Button text='cast vote' onClick={castVote} loading={castVoteHash && !castVoteConfirmed} />
                  <TxLink txHash={castVoteHash} />
                </div>*/}
                <div>
                  <p>4. Enter decryption key to end poll</p>
                  <input onChange={(e) => setDecryptionKey(e.target.value)} />
                  <Button text='end poll' onClick={endPoll} loading={endPollHash && !endPollConfirmed} />
                  <TxLink txHash={endPollHash} />
                </div>
              </div>
            }

          </div>
      }
    </div>
  )
}

export default Agent2;