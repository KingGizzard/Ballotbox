> `terminal` :

```
node FVM/createIdentity.js
node FVM/joinDAO.js
```

> > this will create a public (on chain) and private (on chain and off chain) voting identity for the agent

```
node ipfs/readQuestion.js
```

> >  this will provide the `cid` of the question asked by agent 1

```
node ipfs/encryptAnswer.js <answer>
```

> >  this will encrypt agent 2's answer and write it to `./ipfs/encryptedAnswer.txt`

```
node FMV/createZKAnswer.js
node FVM/submitAnswer.js
```

> > incomplete : but this will submit agent2's vote privately