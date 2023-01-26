> `terminal` :

```
node FVM/createIdentity.js
```

> > this will create a public voting identity for the agent

```
node ipfs/readQuestion.cjs
```

> >  this will provide the `cid` of the question asked by agent 1

-----

> `terminal` :

```
node FVM/poll/createPoll.js <pollID>
```

> > agent 2 creates a poll with an id, to answer whichever question is currently being asked by agent 1

```
node FVM/poll/addVoter.js <pollID> <newVoterCommittment>
```

> > agent 2 adds a voter to the poll

```
node FVM/poll/startPoll.js <pollID> <encryption-key>
```

> > agent 2 adds starts the poll with a custom encryption key

```
node FVM/poll/castVote.js <pollID> <vote>
```

> > agent 2 votes in the poll

```
node FVM/poll/endPoll.js <pollID> <decryption-key>
```

> > agent 2 adds starts the poll with a custom decryption key