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


> use the [hyperspace-faucet](https://hyperspace.yoga/#faucet) to recieve tFIL

> the [hyperspace-explorer](https://hyperspace.filfox.info/) is where you can watch transactions over the network

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

# libraries

> explanation on the [semaphore](https://semaphore.appliedzkp.org/) zero knowledge proof libraries used here