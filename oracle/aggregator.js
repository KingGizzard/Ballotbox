import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from 'dotenv';
import ENV from '../ENV.json' assert { type: 'json' };
import { kMaxLength } from 'buffer';
dotenv.config({ path: '../.env' });
const web3 = new Web3(ENV['filecoin-hyperspace-testnet'].wss);

const privateKey = process.env.skAgent2?.trim() || '';
web3.eth.accounts.wallet.add(privateKey);

const senderAddress =
  web3.eth.accounts.privateKeyToAccount(privateKey)['address'];
console.log('Sender addr:', senderAddress, '\n');

const aggregatorAddress = await fs_.readFile(
  '../blockchain/build/filecoin/aggregator:hyperspace.address',
  'utf-8'
);

console.log('Aggregator addr:', aggregatorAddress);

const aggregatorAbi = await fs_.readFile(
  '../blockchain/build/contracts/BBAggregator.json',
  'utf-8'
);
const aggregatorABI = JSON.parse(aggregatorAbi);
const bbAggregatorContract = new web3.eth.Contract(
  aggregatorABI.abi,
  aggregatorAddress,
  null
);

export async function getContractName() {
  try {
    const transaction = {
      from: senderAddress,
      to: aggregatorAddress,
      gasLimit: 10000000,
    };

    const contractName = await bbAggregatorContract.methods
      .getContractName()
      .call(transaction, function (err, hash) {
        if (!err) {
          console.log('Transaction hash :', hash);
        } else {
          console.log('function updatePoll:', err);
        }
      });
    console.log('CONTRACT NAME: ', contractName);
    process.exit(1);
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
}

export async function updatePollBoolean(pollId, pollAnswer) {
  try {
    const transaction = {
      from: senderAddress,
      to: aggregatorAddress,
      gasLimit: 10000000,
    };

    await bbAggregatorContract.methods
      .updatePollBoolean(pollId, pollAnswer)
      .send(transaction, function (err, hash) {
        if (!err) {
          console.log('Transaction hash :', hash);
        } else {
          console.log('function updatePoll:', err);
        }
      });

    process.exit(1);
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
}

export async function getPollBoolean() {
  try {
    const transaction = {
      from: senderAddress,
      to: aggregatorAddress,
      gasLimit: 10000000,
    };

    const { 0: yesValue, 1: noValue } = await bbAggregatorContract.methods
      .getPollBoolean(1521)
      .call(transaction, function (err, hash) {
        if (!err) {
          console.log('Transaction hash :', hash);
        } else {
          console.log('function updatePoll:', err);
        }
      });
    console.log('Yesvalue:', yesValue, ' Novalue:', noValue);
    process.exit(1);
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
}

// module.exports = {
//   updatePoll,
// };

getPollBoolean();
//getContractName();
