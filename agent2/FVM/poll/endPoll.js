import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
import ENV from '../../../ENV.json' assert { type: "json" };
dotenv.config({ path: '../../.env' });

let API = ENV['filecoin-hyperspace-testnet']['rpc-url'];
const web3 = new Web3(API);
let privateKey = process.env.skAgent2?.trim() || "";
web3.eth.accounts.wallet.add(privateKey);
const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey)['address'];

const pollID = process.argv[2];

async function exec () {
    try {
        const ballotboxAddress = await fs_.readFile("../blockchain/build/filecoin/ballotboxAddress:hyperspace.address", "utf-8");

        const abi = await fs_.readFile("../blockchain/build/contracts/Ballotbox.json", "utf-8");
        const ABI = JSON.parse(abi);
        const ballotbox = new web3.eth.Contract(ABI.abi, ballotboxAddress, null);

        const transaction = {
            from: senderAddress,
            to: ballotboxAddress,
            gasLimit: 10000000
        };

        const pollId = pollID.toString();
        const decryptionKey = ""; // TODO

        await ballotbox.methods.endPollBallotbox(pollId, decryptionKey).send(
            transaction , function(err, hash){
                if(!err){
                    console.log("Transaction hash :", hash);
                }else{
                    console.log(err);
                }
            }
        );

        console.log("New Quesion Addedß");
        process.exit(1);
    } catch (e) {
        console.log(e);
        process.exit(0);
    }
}

exec();