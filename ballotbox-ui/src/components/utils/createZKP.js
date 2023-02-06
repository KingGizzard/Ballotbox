import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group";
import { formatBytes32String } from "@ethersproject/strings";
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

export async function produceZKProof (pollID, Vote, dummyIdentityArray, thisAgentIdentity) {
    var identities = [];
    for (var i in dummyIdentityArray) {
        identities.push((new Identity(i)).commitment);
    }
    const identity = new Identity(String(thisAgentIdentity));
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