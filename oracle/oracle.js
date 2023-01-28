import Web3 from 'web3';
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
import ENV from '../ENV.json' assert { type: "json" };
dotenv.config({ path: '../.env' });
const web3 = new Web3(ENV['filecoin-hyperspace-testnet'].wss);

async function getEvent() {
  const ballotboxAddress = await fs_.readFile("../blockchain/build/filecoin/ballotbox:hyperspace.address", "utf-8");

  const abi = await fs_.readFile("../blockchain/build/contracts/Ballotbox.json", "utf-8");
  const ABI = JSON.parse(abi);
  const ballotbox = new web3.eth.Contract(ABI.abi, ballotboxAddress, null);

  ballotbox.events
  .emitNewQuestion()
  .on('connected', () => {
      console.log('connected');
  })
  .on('data', async event => {
      try {
        console.log(event);
      } catch (e) {
          console.error(e);
      }
  })
  .on('changed', function (event) {})
  .on('error', function (error, receipt) {
      console.log('locked error: ' + error);
  });

  ballotbox.events
  .emitNewRequest()
  .on('connected', () => {
      console.log('connected');
  })
  .on('data', async event => {
      try {
        console.log(event);
      } catch (e) {
          console.error(e);
      }
  })
  .on('changed', function (event) {})
  .on('error', function (error, receipt) {
      console.log('locked error: ' + error);
  });
}
getEvent()