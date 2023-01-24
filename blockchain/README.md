# install

```
npm i
```
------

> add relevant keys to the correct empty spaces, signified by `""`

# compile + deploy to FVM

> deploy initial contracts

```
truffle migrate --network hyperspace
```

> re-deploy contracts

```
truffle migrate --reset --network hyperspace
```

-----

> note : verifier identical to the one [located in dependencies](https://github.com/semaphore-protocol/semaphore/blob/a38dd20276a0458a038164480ef21bd4129a7132/packages/contracts/contracts/verifiers/Verifier20.sol)