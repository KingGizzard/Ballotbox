> `terminal` :

```
node ipfs/askQuestion.cjs
```

> > `cid` can now be seen at `./ipfs/cid.txt`

-----

```
node FVM/pushCID.js
```

> > `cid` now posted on the FVM for the DAO to see

```
node FVM/poll/createPoll.js <pollID>
```

> > agent 1 creates a poll with an id, to answer whichever question is currently being asked by agent 1. At this point, agent 2 should be used.