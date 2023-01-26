require('dotenv').config({ path:'../.env'});

const lighthouse = require('@lighthouse-web3/sdk');
const fs = require('fs/promises');

const ENV = require('../../ENV.json');

const deploy = async() =>{
  const path = "./ipfs/question.txt"; 
  const apiKey = process.env.lighthouseAPI; 

  const response = await lighthouse.upload(path, apiKey);
  
  console.log(ENV.lighthouseUrl + response.data.Hash);
  await saveCID(response.data.Hash);
}

async function saveCID (CID) {
    await fs.writeFile('./ipfs/cid.txt', CID, (err) => {
        if (err) throw err;
    });
    return true;
}

deploy()