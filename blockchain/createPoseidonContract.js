const Artifactor = require("@truffle/artifactor");
const { poseidon_gencontract } = require("circomlibjs");

const artifactor = new Artifactor('./build/contracts');

const poseidonT3ABI = poseidon_gencontract.generateABI(2);
const poseidonT3Bytecode = poseidon_gencontract.createCode(2);

const contractData = {
    contractName: 'PoseidonT3',
    abi: poseidonT3ABI,
    bytecode: poseidonT3Bytecode
};

console.log(contractData)

artifactor.save(contractData);