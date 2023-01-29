import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group";
import { formatBytes32String } from "@ethersproject/strings";
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

const pollID = process.argv[2];
const Vote = process.argv[3];
const dummyVoterIndex = process.argv[4];

export async function produceZKProof () {
    const identity = new Identity(dummyVoterIndex.toString());
    const group = new Group(20);
    group.addMembers([identity.commitment]);

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