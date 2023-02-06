import React, { useState, useEffect } from "react";
import Button from "./Button";
import TxLink from "./TxLink";

const Agent3 = (props) => {
  const { address, ballotboxContract, ballotboxAddress, setTxHashes, txHashes } = props;

  const [requestDataHash, setRequestDataHash] = useState(null);
  const [requestDataConfirmed, setRequestDataConfirmed] = useState(false);

  const [readResultHash, setReadResultHash] = useState(null);
  const [readResultConfirmed, setReadResultConfirmed] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [result, setResult] = useState(null);

  const [CID, setCID] = useState(null);

  const transaction = {
    from: address,
    to: ballotboxAddress,
    gasLimit: 10000000
  }

  const requestData = async () => {
    if (!CID) return setErrorMessage('Please enter a CID');
    await ballotboxContract.methods.requestData(CID, 'me@me.me').send( // dummy email
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setRequestDataConfirmed(false);
          setRequestDataHash(hash);
        }
      }
    )
  } 

  const readResult = async () => {
    let result = await ballotboxContract.methods.getResult().call();
    console.log('result: ', result);
    setResult(result);
  }

  return (
    <div className="w-1/2 mx-auto">
      { 
        !!address ?
          <div>
            <div>
              Enter CID of data to request:
            </div>
            <textarea value={CID} onChange={(e) => setCID(e.target.value)} className='w-1/2' />
            <Button text={'Request Data'} onClick={requestData} loading={requestDataHash && !requestDataConfirmed} />
            <TxLink txHash={requestDataHash} />
            <Button text={'Read Result'} onClick={readResult} loading={readResultHash && !readResultConfirmed} />
            <div>{`result: ${result}`}</div>
            <div className="text-red-400 text-xs">{errorMessage}</div>
          </div>
        : 
          <div>
            Connect to wallet to request data or read results of polls
          </div>
      }
      
    </div>
  )
}

export default Agent3;