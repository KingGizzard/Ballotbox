/** @type {import('next').NextConfig} */
//const { CHAIN_NAMESPACES } = require('@web3auth/client')
const nextConfig = {
  reactStrictMode: true,
  env: {
    lighthouseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiIweDNiMTZiZTA0ZGZkZTkxNTZkN2ViY2MyYmUyMWM2ZjNlMGQwNDM5OTQiLCJpYXQiOjE2NzU3MDc5MzksImV4cCI6MTY3NTc1MTEzOX0.uUOoFiNgK_5ko8J8aR9KsFJu-Nzt98LEDMPgdRe9cKU',
    /*
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xC45",
      rpcTarget: "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
      displayName: "Filecoin Hyperspace",
      blockExplorer: "https://hyperspace.filfox.info/en",
      ticker: "tFIL",
      tickerName: "Test Filecoin",
    },
    */
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x13881",
        rpcTarget: "https://matic-mumbai.chainstacklabs.com",
        displayName: "Mumbai Testnet",
        blockExplorer: "https://mumbai.polygonscan.com/",
        ticker: "MATIC",
        tickerName: "MATIC",
    },
    web3AuthClientId: 'BGpfvIVo7dEpVFanD8Vw_xBRWSEwININ1VTSBs7GVZPc2vkoNof-B-pCXEPipi3ReT03yQyORxM7D0pwcxHNZH4',
    ballotboxAddress: '0x674aF94392dB3DA455863404a8705486617D2E45',
  },
}

module.exports = nextConfig
