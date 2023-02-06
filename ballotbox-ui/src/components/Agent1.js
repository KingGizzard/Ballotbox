import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import lighthouse from '@lighthouse-web3/sdk'
import Button from './Button';

const fileTypes = ['txt']; // for file uploader
const defaultErrorMsg = ' ';

/*
We are initializing with EIP155 namespace which will initialize the
modal with ethereum mainnet by default.
*/

const Agent1 = (props) => {
  const { web3, ballotboxContract, address, ballotboxAddress } = props;

  const [ipfsHash, setIpfsHash] = useState('');
  
  const [deployHash, setDeployHash] = useState(null);
  const [deployConfirmed, setDeployConfirmed] = useState(false);

  const [createPollHash, setCreatePollHash] = useState(null);
  const [createPollConfirmed, setCreatePollConfirmed] = useState(false);

  const [pollId, setPollId] = useState(null);  

  const [inputText, setInputText] = useState(null);
  const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);
  const [txHashes, setTxHashes] = useState([]);
  
  // delete this later, lighthouse was down for a bit
  useEffect(() => {
    setIpfsHash('QmfVZviJh1MKFSxCCfngyjoGqrYtCoTYpvqz8FoueCK4v3');
  }, []);

  useEffect(() => {
    console.log('ipfs hash: ', ipfsHash);
  }, [ipfsHash]);

  const TxWidget = (props) => {
    const { txHash } = props;
    return (
      <div>
        view on
        <a href={`https://hyperspace.filfox.info/en/tx/${txHash}`}  >
          FILFOX
        </a> 
      </div>
    );
  };



  useEffect(() => {
    if (address) {
      console.log('address: ', address);
    }
  }, [address])

  const handleChange = (file) => {
    const reader = new FileReader();
    setFile(file);
    if (file) {
      console.log('file: ', file);
      
      reader.readAsText(file);
      console.log(reader);
      reader.onload = () => {
        console.log(reader.result);
        setFileData(reader.result);
        deploy(reader.result);
      }
    }    
  }

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (e) => {
    if (!e) {
      setErrorMsg('Please enter text before attempting to upload');
      return;
    }
    setErrorMsg(defaultErrorMsg);
    const output = await lighthouse.uploadText(e, process.env.lighthouse_key, progressCallback);
    setIpfsHash(output.data.Hash);
    console.log('File status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  const checkTxStatus = async (hash) => {
    const tx = await web3.eth.getTransactionReceipt(hash);
    console.log('checking tx: ', hash, tx);
    if (tx) {
      if (tx.blockNumber) {
        return true;
      }
    }
    return false; 
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (deployHash && !deployConfirmed) {
        checkTxStatus(deployHash).then((status) => {
          if (status) {
            setDeployConfirmed(true);
          }
        })
      }
      if (createPollHash && !createPollConfirmed) {
        checkTxStatus(createPollHash).then((status) => {
          if (status) {
            setCreatePollConfirmed(true);
          }
        })
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deployHash, createPollHash, deployConfirmed, createPollConfirmed]);

  const FEVMDeploy = async () => {
    const transaction = {
      from: address,
      to: ballotboxAddress,
      gasLimit: 10000000,
    }

    await ballotboxContract.methods.newQuestionBallotbox(ipfsHash).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
          setErrorMsg('Error submitting transaction:', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setDeployConfirmed(false);
          setDeployHash(hash);
        }
      }
    )
  }

  const createPoll = async () => {
    const id = BigInt(Math.round(Math.random() * 10 ** 6));
    const merkleTreeDepth = 20;

    const transaction = {
      from: address,
      to: ballotboxAddress,
      gasLimit: 100000000,
    }

    await ballotboxContract.methods.createPollBallotbox(id, merkleTreeDepth).send(
      transaction, function(err, hash) {
        if (err) {
          console.log('error: ', err);
          setErrorMsg('Error submitting transaction:', err);
        } else {
          setTxHashes([...txHashes, hash]);
          setCreatePollHash(hash);
          setCreatePollConfirmed(false);
          setPollId(id);
        }
      }
    );
  }

  return (
    <div className='text-center w-[510px] mx-auto flex flex-col gap-3'>
      <h1 className='text-2xl'>Upload Question</h1>
      <div>
        <FileUploader 
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          disabled={!!ipfsHash}
        />
      </div>
      <p>or enter text manually</p>
      <textarea
        disabled={!!ipfsHash}
        className='px-1'
        onChange={(e) => setInputText(e.target.value)}
      />
      <div
        className={!!ipfsHash ? 'w-1/3 mx-auto select-none bg-gray-600 rounded-full px-2 hover:cursor-not-allowed' : 'w-1/3 mx-auto select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out'}
        onClick={() => deploy(inputText)}
      >
        Enter
      </div>
      {ipfsHash && <p>
        {'uploaded successfully, view on: '}
        <a 
          href={`https://gateway.lighthouse.storage/ipfs/${ipfsHash}`}
          target="_blank"
          rel='noopener noreferrer'
          className='text-blue-500 hover:text-blue-400'
        >
          {ipfsHash}
        </a>
        <br/>
        <p>
          Connect to wallet to upload question to FEVM
        </p>
        {!!address &&
          <div>
            {
              !deployConfirmed ?
                <Button onClick={FEVMDeploy} text='Push to Hyperspace' loading={deployHash && !deployConfirmed} />
              :
                <Button onClick={createPoll} text='Create Poll' loading={createPollHash && !createPollConfirmed} />
            }
          </div>
        }
        {
          deployConfirmed && createPollConfirmed &&
          <div
            className='w-1/3 mx-auto select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out'
            onClick={() =>setIpfsHash(null)}
          >
            Click to upload another 
          </div>
        }
      </p>}
      <div className='text-sm text-red-400'>
        {errorMsg}
      </div>
      <div>
        {txHashes.map((hash) => {
          <div key={hash}>
            <TxWidget txHash={hash} />
          </div>
        })}
      </div>
    </div>
  )
}

export default Agent1;