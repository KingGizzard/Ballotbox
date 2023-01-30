import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import lighthouse from '@lighthouse-web3/sdk'

const fileTypes = ['txt'];

const Agent1 = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);

  

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
    console.log('File status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div className='flex flex-col justify-center text-center'>
      <FileUploader 
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      {fileData && <img className='max-w-[30vw] max-h-[30vh]' src={fileSrc} />}
    </div>
  )
}

export default Agent1;