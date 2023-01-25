import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { formatBytes32String } from "@ethersproject/strings";
import * as fs from 'fs/promises';
import * as dotenv from "dotenv";
import {createIdentity} from './createIdentity.js';
import {createGroup} from './createGroup.js';
dotenv.config({ path: '../../.env' });

const vote = process.argv[2];

async function produceZKProof () {
    const identity = await createIdentity();
    const group = await createGroup();

    const signal = formatBytes32String(vote);
    const externalNullifier = 1;
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../tse/semaphore.zkey",
        wasmFilePath: "../tse/semaphore.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    console.log(solidityProof);
    process.exit();
}

async function save (path, type) {
    await fs.writeFile(path, type.toString(), (err) => {
        if (err) throw err;
    });
    return true;
}

produceZKProof ();