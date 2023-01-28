> `terminal` :

```
node FVM/createIdentity.js <phrase>
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
node FVM/poll/addVoter.js <pollID> <dummyVoterIndex>
```

> > agent 2 adds a voter to the poll (dummyVoterIndex = 1, 2 or 3)

```
node FVM/poll/startPoll.js <pollID> <encryption-key>
```

> > agent 2 adds starts the poll with a custom encryption key

```
node FVM/poll/castVote.js <pollID> <vote = 0 or 1> <dummyVoterIndex> <externalNullifier>
```

> > dummy voter votes in the poll using agent 2 as a proxy

```
node FVM/poll/endPoll.js <pollID> <decryption-key>
```

> > agent 2 adds starts the poll with a custom decryption key

-----

> > > as you can tell: agent 2 here is quite at risk of being infamous for enabling anons to be anon!