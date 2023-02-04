> `terminal` :

```
node FVM/requestData <CID> <email>
```

> > this will add a request on-chain for data. The request includes the CID of the requested data and the email of agent 3

```
node FVM/readResult
```

> > this will read the result from the poll to agent 3's console

-----

```
node ipfs/readAnswer.cjs <CID>
```

> >  the will read the encrypted requested data to agent 3's terminal