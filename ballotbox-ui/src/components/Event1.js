import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import lighthouse from '@lighthouse-web3/sdk'

const fileTypes = ['txt'];

const Agent1 = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [inputText, setInputText] = useState(null);

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

  useEffect(() => {
    console.log('input text:', inputText);
  }, [inputText]);

  return (
    <div className='text-center w-[510px] mx-auto flex flex-col gap-3'>
      <h1 className='text-2xl'>Agent 1</h1>
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