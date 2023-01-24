const Verifier = artifacts.require("Verifier20");
const Ballotbox = artifacts.require("Ballotbox");

const {promises:fs} = require('fs');

module.exports = async function (deployer) {
  await deployer.deploy(Verifier);
  const verifier = await Verifier.deployed();
  await saveAddress('ballotbox', verifier.address);

  await deployer.deploy(Ballotbox, verifier.address)
  const ballotbox = await Ballotbox.deployed();
  await saveAddress('ballotbox', ballotbox.address);
};

async function saveAddress(name, address){
  await fs.writeFile('./build/filecoin/' + name + "" + "hyperspace.address", address, (err) => {
    if (err) throw err;
  });
}