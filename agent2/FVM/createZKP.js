import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { formatBytes32String } from "@ethersproject/strings";
import * as dotenv from "dotenv";
import {createIdentity} from './createIdentity.js';
import {createGroup} from './createGroup.js';
dotenv.config({ path: '../../.env' });

export async function produceZKProof (vote, phrase, externalNullifier) {
    const identity = await createIdentity(phrase);
    const group = await createGroup();

    const signal = formatBytes32String(vote);
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../tse/semaphore.zkey",
        wasmFilePath: "../tse/semaphore.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    return solidityProof;
}

produceZKProof ();