> `terminal` :

```
node FVM/createIdentity.js
```

> > this will create a public voting identity for the agent

```
node ipfs/readQuestion.js
```

> >  this will provide the `cid` of the question asked by agent 1

```
node ipfs/encryptAnswer.js <answer>
```

> >  this will encrypt agent 2's answer and write it to `./ipfs/encryptedAnswer.txt`

```
node FMV/createZKP.js <1 or 0>
```

> > this will create a zero knowledge proof that agent 3 answered `1 or 0`.