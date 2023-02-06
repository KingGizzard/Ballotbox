import Head from 'next/head';
import Agent1 from '@/components/Agent1';
import Agent2 from '@/components/Agent2';
import Agent3 from '@/components/Agent3';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import ballotbox from '../Ballotbox.json';
import Web3 from 'web3';

export default function Home() {
  const [showAgent1, setShowAgent1] = useState(true);
  const [showAgent2, setShowAgent2] = useState(false);
  const [showAgent3, setShowAgent3] = useState(false);
  const [focus, setFocus] = useState(1);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [ballotboxContract, setBallotboxContract] = useState(null);
  const [txHashes, setTxHashes] = useState([]);

  const ballotbox_abi = ballotbox.abi;
  // shouldn't hard code this, make sure to change later :)
  // const ballotboxAddress = '0xD74eDe99B75bBc85b63697e3caB86b0890a0789C'; // hyperspace 
  const ballotboxAddress = '0x5b69a277dA35ACB038ac8a6d229980669eaC64A5'; // mumbai
  useEffect(() => {
    if (provider) {
      const web3 = new Web3(provider);
      setWeb3(web3);
      web3.eth.getAccounts().then((accounts) => {
        setAddress(accounts[0]);
      });
      const ballotboxContract = new web3.eth.Contract(ballotbox_abi, ballotboxAddress);
      setBallotboxContract(ballotboxContract);
    }
  }, [provider]);

  const show = (agent) => {
    console.log('agent: ', agent)
    if (agent === 1) {
      setShowAgent1(true);
      setShowAgent2(false);
      setShowAgent3(false);
      setFocus(1);
    } else if (agent === 2) {
      setShowAgent1(false);
      setShowAgent2(true);
      setShowAgent3(false);
      setFocus(2);
    } else {
      setShowAgent1(false);
      setShowAgent2(false);
      setShowAgent3(true);
      setFocus(3);
    }
  }

  return (
    <>
      <Head>
        <title>Ballotbox</title>
        <meta name="description" content="Ballotbox" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='text-center'>
        <div>
          <Header
            show={show}
            focus={focus}
            provider={provider}
            setProvider={setProvider}
            address={address}
            setAddress={setAddress}
          />
          { showAgent1 && <Agent1 provider={provider} address={address} web3={web3} ballotboxContract={ballotboxContract} ballotboxAddress={ballotboxAddress} txHashes={txHashes} setTxHashes={setTxHashes} /> }
          { showAgent2 && <Agent2 provider={provider} address={address} web3={web3} ballotboxContract={ballotboxContract} ballotboxAddress={ballotboxAddress} txHashes={txHashes} setTxHashes={setTxHashes} /> }
          { showAgent3 && <Agent3 provider={provider} address={address} web3={web3} ballotboxContract={ballotboxContract} ballotboxAddress={ballotboxAddress} txHashes={txHashes} setTxHashes={setTxHashes} /> }
        </div> 
        <div>
      </div>
      </main>
    </>
  )
}
