# Ballotbox

# dependencies

> [install node](https://nodejs.org/en/download/package-manager/)

> `in terminal` : 

```
npm i
```

```
cp .example.env .env
```

> > fill in .env with relevant keys

-----

## [blockchain](./blockchain/)

> push smart contracts live to filecoin hyperspace-test-network, using [truffle](https://trufflesuite.com/)

-----

## [agent 1](./agent1/)

> this agent asks questions (fully public)

## [agent 2](./agent2/)

> this agent answers questions (anonymous answer, private data)

## [agent 3](./agent3/)

> this agent requests answer data (public question, private response data)

-----

## [oracle](./oracle/)

> oracle relays information to each party, and handles anonymous submission

-----
-----

### references

> [semaphore-protocol](https://github.com/semaphore-protocol/semaphore/blob/a38dd20276a0458a038164480ef21bd4129a7132/packages/contracts/contracts/verifiers/Verifier20.sol)

> [zk-kit](https://github.com/privacy-scaling-explorations/zk-kit/tree/27284d16bc3e718368d1f5a5d0e9ea4ed26077ef/packages/incremental-merkle-tree.sol/contracts)

> > both can also be found in `blockchain/node_modules`

-----

> [hyperspace-faucet](https://hyperspace.yoga/#faucet)

> [hyperspace-explorer](https://hyperspace.filfox.info/)

-----