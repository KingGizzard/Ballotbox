# install

```
npm i
```

# environment set-up

```
cp .example.env .env
```

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

> > this process should be followed byfunding the contract with [fundContract.js](../utils/)