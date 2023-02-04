import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group";
import { formatBytes32String } from "@ethersproject/strings";
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

const pollID = process.argv[2];
const Vote = process.argv[3];
const dummyIdentityArray = process.argv[4];
const thisAgentIdentity = process.argv[5];

export async function produceZKProof () {
    var identities = [];
    for (var i in JSON.parse(dummyIdentityArray)) {
        identities.push((new Identity(i)).commitment);
    }
    const identity = new Identity(thisAgentIdentity.toString());
    const group = new Group(20);
    group.addMembers(identities);

    const signal = formatBytes32String(Vote);
    const externalNullifier = BigInt(pollID);
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../pse/semaphore20.zkey",
        wasmFilePath: "../pse/semaphore20.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    return {fullProof, solidityProof};
}

produceZKProof ();