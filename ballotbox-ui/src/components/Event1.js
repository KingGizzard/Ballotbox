import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import lighthouse from '@lighthouse-web3/sdk'

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import Web3 from 'web3';

const fileTypes = ['txt'];

  
/*
We are initializing with EIP155 namespace which will initialize the
modal with ethereum mainnet by default.
*/


const Agent1 = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [address, setAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [provider, setProvider] = useState(null);

  const shortenAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const web3AuthConnect = async () => {
    const web3auth = new Web3Auth({
      chainConfig: {
        /*
          you can pass your own chain configs here
          by default it will only chainId is required for supported networks
          such as [rinkeby, ropsten, goerli, kovan]
        */
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0xC45",
        rpcTarget: "https://api.hyperspace.node.glif.io/rpc/v1",
        displayName: "Filecoin Hyperspace",
        blockExplorer: "https://hyperspace.filfox.info/en",
        ticker: "tFIL",
        tickerName: "Test Filecoin",
      },
      clientId: "BGpfvIVo7dEpVFanD8Vw_xBRWSEwININ1VTSBs7GVZPc2vkoNof-B-pCXEPipi3ReT03yQyORxM7D0pwcxHNZH4" // get from https://dashboard.web3auth.io
    // get from https://dashboard.web3auth.io
    })
    await web3auth.initModal();
    web3auth.connect();
    setProvider(web3auth.provider);
  }

  const web3AuthDisconnect = () => {
    setProvider(null);
    setAddress(null);
  }


  useEffect(() => {
    if (provider) {
      const web3 = new Web3(provider);
      setWeb3(web3);
      web3.eth.getAccounts().then((accounts) => {
        setAddress(accounts[0]);
      });
    }
  }, [provider]);

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
    const output = await lighthouse.uploadText(e, process.env.lighthouse_key, progressCallback);
    setIpfsHash(output.data.Hash);
    console.log('File status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
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
      <div className='self-center flex gap-3' disabled={!!ipfsHash}>
        <input
          disabled={!!ipfsHash}
          className='px-1'
          onChange={(e) => setInputText(e.target.value)}
        />
        <div
          className={!!ipfsHash ? 'select-none bg-gray-600 rounded-full px-2 hover:cursor-not-allowed' : 'select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out'}
          onClick={() => deploy(inputText)}
        >
          Enter
        </div>
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
        {!address ?
            <div
              className='select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out w-1/2 mx-auto my-1'
              onClick={() => web3AuthConnect()}
            >
              Connect to wallet
            </div>
          :
            <div
              className='select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out w-1/2 mx-auto my-1'
              onClick={() => web3AuthDisconnect()}
            >
              Disconnect from {shortenAddress(address)}
            </div>
        }
        <div
          className='select-none bg-gray-600 rounded-full px-2 hover:cursor-pointer hover:bg-gray-500 duration-150 ease-in-out w-1/2 mx-auto my-1'
          onClick={() => setIpfsHash(null)}
        >
          click here to upload another
        </div>
      </p>}
    </div>
  )
}

export default Agent1;