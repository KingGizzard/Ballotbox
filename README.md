# Ballotbox

> built during the [2023 FVM hackathon](https://spacewarp.fvm.dev/)

-----
-----
-----

## set up

### dependencies

> [install node](https://nodejs.org/en/download/package-manager/)

```
npm i
npm install -g @lighthouse-web3/sdk
```

-----

### environment

```
cp .example.env .env
```

> fill in `.env` with relevant keys

```
lighthouse-web3 import-wallet --key <skAgent2>
lighthouse-web3 api-key --new 
```

```
node utils/dummies/genDummyCommittments.js
```

-----
-----
-----

## protocol

### [blockchain](./blockchain/)

> push smart contracts live to filecoin hyperspace-test-network, using [truffle](https://trufflesuite.com/)

-----

### [agent 1](./agent1/)

> this agent asks questions (fully public)

-----

### [agent 2](./agent2/)

> this agent answers questions (anonymous answer, private data)

-----

### [agent 3](./agent3/)

> this agent requests answer data (public question, private response data)

-----

### [oracle](./oracle/)

> oracle relays information to each party, and handles anonymous submission

-----
-----
-----

## libraries

> explanations on [semaphore's](https://semaphore.appliedzkp.org/) zero knowledge proof libraries 

> explanation of [lighthouse-sdk](https://docs.lighthouse.storage/lighthouse-1/) for file storage

-----

## resources

> [hyperspace-faucet](https://hyperspace.yoga/#faucet) 

> [hyperspace-explorer](https://hyperspace.filfox.info/)