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

### references

> [semaphore-protocol](https://github.com/semaphore-protocol/semaphore/blob/a38dd20276a0458a038164480ef21bd4129a7132/packages/contracts/contracts/verifiers/Verifier20.sol)

> [zk-kit](https://github.com/privacy-scaling-explorations/zk-kit/tree/27284d16bc3e718368d1f5a5d0e9ea4ed26077ef/packages/incremental-merkle-tree.sol/contracts)

> > both can also be found in the node module folder in this directory

-----

> [hyperspace-faucet](https://hyperspace.yoga/#faucet)

> [hyperspace-explorer](https://hyperspace.filfox.info/)

-----