# install

```
npm i
```
------

# compile + deploy to FVM

> deploy initial contracts

```
truffle compile
node createPoseidonContract.js
```

```
truffle migrate --network hyperspace
```

> re-deploy contracts

```
truffle migrate --reset --network hyperspace
```

> this process should be followed by [funding the contracts](../utils/)