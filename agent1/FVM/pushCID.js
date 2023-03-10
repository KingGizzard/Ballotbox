import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
import ENV from '../../ENV.json' assert { type: "json" };
dotenv.config({ path: '../.env' });

const API = ENV['filecoin-hyperspace-testnet']['rpc-url'];
const web3 = new Web3(API);
const privateKey = process.env.skAgent1?.trim() || "";
web3.eth.accounts.wallet.add(privateKey);
const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey)['address'];

async function execute () {
    try {
        const cid = await fs_.readFile('./ipfs/cid.txt');
        const CID = cid.toString();
        const ballotboxAddress = await fs_.readFile("../blockchain/build/filecoin/ballotbox:hyperspace.address", "utf-8");

        const abi = await fs_.readFile("../blockchain/build/contracts/Ballotbox.json", "utf-8");
        const ABI = JSON.parse(abi);
        const ballotbox = new web3.eth.Contract(ABI.abi, ballotboxAddress, null);

        const transaction = {
            from: senderAddress,
            to: ballotboxAddress,
            gasLimit: 10000000
        };

        await ballotbox.methods.newQuestionBallotbox(CID).send(
            transaction , function(err, hash){
                if(!err){
                    console.log("Transaction hash :", hash);
                }else{
                    console.log(err);
                }
            }
        );

        process.exit(1);
    } catch (e) {
        console.log(e);
        process.exit(0);
    }
}

execute();