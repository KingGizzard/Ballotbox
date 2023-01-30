import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['jpg', 'png', 'gif', 'txt', 'json', 'webp'];

const Agent1 = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  }

  useEffect(() => {
    if (file) {
      console.log('file: ', file);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        setFileData(binaryStr);
      }
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    <div>
      <FileUploader 
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File info: ${file.name}` : "no files uploaded yet"}</p>
      {fileData && <img src={fileData} />}
    </div>
  )
}

export default Agent1;