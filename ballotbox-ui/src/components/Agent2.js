import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Identity } from "@semaphore-protocol/identity"

const Agent2 = (props) => {
  const { address, ballotboxContract, ballotboxAddress } = props;

  const [pollId, setPollId] = useState(null);
  const [pollIdConfirmed, setPollIdConfirmed] = useState(null);

  const [dummyVoterIndex, setDummyVoterIndex] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [vote, setVote] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState(null);

  const transaction = {
    from: address,
    to: ballotboxAddress,
    gasLimit: 10000000
  }

  const addVoter = () => {

  }

  return (
    <div className="m-auto flex flex-col gap-6 my-8 w-1/2">
      {
        !address ? 
          <h1 className="text-xl">Connect wallet to add voters, start poll, cast a vote, or end a poll</h1>
        :
          <div className="">
            <div>Enter poll ID</div>
            <input onChange={(e) => setPollId(e.target.value)} />
            <Button text='Confirm' onClick={() => setPollIdConfirmed(true)} />
            { pollIdConfirmed &&
              <div className="my-8 flex flex-col gap-3">
                <div>
                  <p>Enter encryption key to start poll</p>
                  <input onChange={(e) => setEncryptionKey(e)} />
                  <Button text='start poll' />
                </div>                
                <div>
                  <p>Enter dummy voter index to add voter</p>
                  <input onChange={(e) => setDummyVoterIndex(e)} /> 
                  <Button text='add voter' />
                </div>
                <div>
                  <p>Enter vote</p>
                  <input onChange={(e) => setVote(e)} />
                  <Button text='cast vote' />
                </div>
                <div>
                  <p>Enter decryption key to end poll</p>
                  <input onChange={(e) => setDecryptionKey(e)} />
                  <Button text='end poll' />              
                </div>
              </div>
            }

          </div>
      }
    </div>
  )
}

export default Agent2;