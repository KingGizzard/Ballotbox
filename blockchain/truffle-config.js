const HDWalletProvider = require("@truffle/hdwallet-provider");
const ENV = require("../ENV.json");
require('dotenv').config({ path:'../.env'});

const API = ENV["filecoin-hyperspace-testnet"]["rpc-url"];
const privateKey = process.env.skAgent2?.trim() || "";

module.exports = {

  networks: {
    hyperspace: {
      provider: () =>
        new HDWalletProvider(privateKey, API),
      network_id: ENV["filecoin-hyperspace-testnet"]["chain-id"],
      skipDryRun: true, 
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.4", 
      // docker: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "byzantium",
      },
    },
  },
};