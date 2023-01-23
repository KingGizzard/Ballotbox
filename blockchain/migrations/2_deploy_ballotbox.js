const Ballotbox = artifacts.require('Ballotbox');
const {promises:fs} = require('fs');

async function saveAddress(name, address){
  await fs.writeFile('./build/filecoin/' + name + "" + "hyperspace.address", address, (err) => {
    if (err) throw err;
  });
}

module.exports = async function (deployer) {
  console.log('Deploying Ballotbox');
  await deployer.deploy(Ballotbox);
  const ballotbox = await Ballotbox.deployed();
  await saveAddress("ballotboxAddress:", ballotbox.address);
};