import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity"
import { formatBytes32String } from "@ethersproject/strings";
import * as dotenv from "dotenv";
import {createGroup} from './createGroup.js';
dotenv.config({ path: '../../.env' });

const pollID = process.argv[2];
const Vote = process.argv[3];
const dummyVoterIndex = process.argv[4];

export async function produceZKProof () {
    const identity = new Identity(dummyVoterIndex.toString());
    const group = await createGroup(identity.commitment);

    const signal = formatBytes32String(Vote);
    const externalNullifier = BigInt(pollID);
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../pse/semaphore.zkey",
        wasmFilePath: "../pse/semaphore.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    return {fullProof, solidityProof};
}

produceZKProof ();