import React, { useState, useEffect } from "react";
import Button from "./Button";

import { Web3Auth } from "@web3auth/modal";

const Header = (props) => {
  const { show, focus, setProvider, provider, address, setAddress } = props;

  const shortenAddress = (address) => {
    return address ? address.slice(0, 6) + '...' + address.slice(-4) : '';
  };

  const web3AuthConnect = async () => {
    const web3auth = new Web3Auth({
      chainConfig: process.env.chainConfig,
      clientId: process.env.web3AuthClientId // get from https://dashboard.web3auth.io
    // get from https://dashboard.web3auth.io
    })
    await web3auth.initModal();
    web3auth.connect();
    setProvider(web3auth.provider);
  }

  const web3AuthDisconnect = () => {
    console.log('setting to null')
    setProvider(null);
    setAddress(null);
  }

  const Tab = (props) => {
    const { title, show, focus } = props;
    return ( 
      <h1
        className={`w-1/3 px-4 py-2 text-2xl select-none  cursor-pointer select-none duration-100 ease-in-out mx-[0.5px] ${focus ? 'bg-gray-500' : 'bg-gray-600'} hover:bg-gray-500 hover:border-x border-black`}
        onClick={show}
      >
        {title}
      </h1>
    )
  }

  return (
    <header className="m-2 justify-center flex flex-col gap-4">
      <div className="flex">
        <Tab title="Post Question" show={() => show(1)} focus={focus == 1} />
        <Tab title="Answer Questions" show={() => show(2)} focus={focus == 2} />
        <Tab title="View Answers" show={() => show(3)} focus={focus==3} />        
      </div>
      {
        !address ? 
          <Button text="Connect to wallet" loading={false} onClick={() => web3AuthConnect()} />
          :
          <Button text={`Disconnect from ${shortenAddress(address)}`} loading={false} onClick={() => web3AuthDisconnect()} />
      }
    </header>
  )
}

export default Header;