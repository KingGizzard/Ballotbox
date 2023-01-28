import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
import ENV from '../../../ENV.json' assert { type: "json" };
import {produceZKProof} from '../createZKP.js';
dotenv.config({ path: '../.env' });

const API = ENV['filecoin-hyperspace-testnet']['rpc-url'];
const web3 = new Web3(API);
const privateKey = process.env.skAgent2?.trim() || "";
web3.eth.accounts.wallet.add(privateKey);
const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey)['address'];

const pollID = process.argv[2];
const Vote = process.argv[3];

async function exec () {
    try {
        const ballotboxAddress = await fs_.readFile("../blockchain/build/filecoin/ballotbox:hyperspace.address", "utf-8");

        const abi = await fs_.readFile("../blockchain/build/contracts/Ballotbox.json", "utf-8");
        const ABI = JSON.parse(abi);
        const ballotbox = new web3.eth.Contract(ABI.abi, ballotboxAddress, null);

        const transaction = {
            from: senderAddress,
            to: ballotboxAddress,
            gasLimit: 10000000
        };

        const vote = parseInt(Vote);
        const pollId = parseInt(pollID);
        const proof = await produceZKProof();
        const nullifierHash = proof.fullProof.publicSignals.nullifierHash;

        await ballotbox.methods.castVoteBallotbox(vote, nullifierHash, pollId, proof.solidityProof).send(
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

exec();