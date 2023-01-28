const Verifier = artifacts.require("Verifier20");
const Ballotbox = artifacts.require("Ballotbox");
const IncrementalBinaryTree = artifacts.require("IncrementalBinaryTree");
const PoseidonT3 = artifacts.require("PoseidonT3");

const {promises:fs} = require('fs');

module.exports = async function (deployer) {
  await deployer.deploy(Verifier);
  const verifier = await Verifier.deployed();
  await saveAddress('verifier', verifier.address);

  await deployer.deploy(PoseidonT3);
  const poseidon = await PoseidonT3.deployed();
  await saveAddress('poseidon', poseidon.address);

  deployer.link(PoseidonT3, IncrementalBinaryTree);
  await deployer.deploy(IncrementalBinaryTree);
  const incementalBinaryTree = await IncrementalBinaryTree.deployed();
  await saveAddress('incementalBinaryTree', incementalBinaryTree.address);

  deployer.link(IncrementalBinaryTree, Ballotbox);
  await deployer.deploy(Ballotbox, [[verifier.address, 20]])
  const ballotbox = await Ballotbox.deployed();
  await saveAddress('ballotbox', ballotbox.address);
};

async function saveAddress(name, address){
  await fs.writeFile('./build/filecoin/' + name + "" + ":hyperspace.address", address, (err) => {
    if (err) throw err;
  });
}