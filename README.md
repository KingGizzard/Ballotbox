# Ballotbox

# dependencies

> [install node](https://nodejs.org/en/download/package-manager/)

> `in terminal` : 

```
npm i
```

> > fill in .example.env with relevant keys

```
cp .example.env .env
```

-----

## [blockchain](./blockchain/)

> push smart contracts live to filecoin hyperspace-test-network, using [truffle](https://trufflesuite.com/)

-----

## [agent 1](./agent1/)

> this agent asks questions (fully public)

> > requires work on `ipfs/askQuestion.js` : how can we make this file much larger?

## [agent 2](./agent2/)

> this agent answers questions (anonymous answer, private data)

> > requires work on `ipfs/encryptAnswer.js` : how can we make this bulletproof?

## [agent 3](./agent3/)

> this agent requests answer data (public question, private response data)

> > requires building (ground up)

-----

## [oracle](./oracle/)

> oracle relays information to each party, and handles anonymous submission

> > requires building (ground up)

-----
-----

 > [hyperspace-faucet](https://hyperspace.yoga/#faucet)

 > [hyperspace-explorer](https://hyperspace.filfox.info/)

-----
-----
-----

> [semaphore](./blockchain/contracts//semaphore/) are forked from [here](https://github.com/hadzija7/ZKVoting/tree/main/contracts/contracts)