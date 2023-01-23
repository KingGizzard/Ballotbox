import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
import ENV from '../../ENV.json' assert { type: "json" };
dotenv.config({ path: '../blockchain/.env' });

const cid = await fs_.readFile('./ipfs/cid.txt');
const CID = cid.toString();
const ballotboxAddress = await fs_.readFile("../blockchain/build/filecoin/ballotboxAddress:hyperspace.address", "utf-8");

async function execute () {

}

execute ()