import React, { useState, useEffect } from "react";
import ballotbox from '../Ballotbox.json';

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import Web3 from 'web3';

const Agent3 = (props) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);

  const web3AuthConnect = async () => {
    const web3auth = new Web3Auth({
      chainConfig: {
        /*
          you can pass your own chain configs here
          by default it will only chainId is required for supported networks
          such as [rinkeby, ropsten, goerli, kovan]
        */
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0xC45",
        rpcTarget: "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
        displayName: "Filecoin Hyperspace",
        blockExplorer: "https://hyperspace.filfox.info/en",
        ticker: "tFIL",
        tickerName: "Test Filecoin",
      },
      clientId: "BGpfvIVo7dEpVFanD8Vw_xBRWSEwININ1VTSBs7GVZPc2vkoNof-B-pCXEPipi3ReT03yQyORxM7D0pwcxHNZH4" // get from https://dashboard.web3auth.io
    // get from https://dashboard.web3auth.io
    })
    await web3auth.initModal();
    web3auth.connect();
    setProvider(web3auth.provider);
  }

  const web3AuthDisconnect = () => {
    setProvider(null);
    setAddress(null);
  }


  const ballotbox_abi = ballotbox.abi;
  const ballotboxAddress = '0x6eEb802EADB62E0B9616c71D2e958381d2a977D5'; // shouldn't hard code this, make sure to change later :)

  return (
    <div>
      <h1>Agent 3</h1>
    </div>
  )
}

export default Agent3;