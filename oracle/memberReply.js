import { updatePollBoolean, getContractName } from './aggregator.js';

//const result = await deployedContract.getData({from: accountAddress});
//const {0: strValue, 1: boolValue, 2: intValue} = result;

const pollId = process.argv[2];
const pollAnswer = process.argv[3];

export const reply = async () => {
  updatePollBoolean(pollId, pollAnswer).then(
    console.log('Poll answer updated.')
  );
};

reply();

// export const getName = async () => {
//   getContractName().then(console.log('get contract name function called.'));

//   //await getContractName().then(console.log('called ContractName function'));
// };
// getName()
