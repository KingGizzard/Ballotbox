const ethers = require("ethers");
const ABI = require("./abi.json"); // need to generate
require("dotenv").config();


// reuse for other events
async function getEvent1() {
  const contractAddress = "0x..."; // contract address
  const provider = new ethers.provider.WebSocketProvider(
    // provider here
  )

  const contract = new ethers.Contract(contractAddress, ABI, provider);

  contract.on("event", (contractEvent) => {
    console.log(contractEvent);
  });
}
