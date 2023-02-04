> `terminal` :

```
node ipfs/readQuestion.cjs
```

> >  this will provide the `cid` of the question asked by agent 1

-----

> `terminal` :

```
node FVM/poll/addVoter.js <pollID> <dummyVoterIndex>
```

> > agent 2 adds a voter to the poll (dummyVoterIndex = 0, 1, ... etc)

```
node FVM/poll/startPoll.js <pollID> <encryption-key>
```

> > agent 2 starts the poll with a custom encryption key. 

```
node FVM/poll/castVote.js <pollID> <vote = 0 or 1> <dummyVoterArray = "[0, 1, ... etc]"> <dummyVoterIndex>
```

> > dummy voter votes in the poll using agent 2 as a proxy (dummyVoterArray should include all the dummyVoters added to the poll)

```
node FVM/poll/endPoll.js <pollID> <decryption-key>
```

> > agent 2 ends the poll with a custom decryption key. At this point, agent 3 should be used.

-----

> > > as you can tell: agent 2 here is quite at risk of being infamous for enabling anons to be anon!