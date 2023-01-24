import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { formatBytes32String } from "@ethersproject/strings";
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

const cid = await fs_.readFile('../agent1/ipfs/cid.txt');
const CID = cid.toString();

console.log(CID)

async function produceZKProof () {
    const signal = formatBytes32String(CID);
    const root = ""; // TODO
    const externalNullifier = 1;
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../../static/semaphore.zkey",
        wasmFilePath: "../../static/semaphore.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    const { nullifierHash } = fullProof.publicSignals;
    const verifierAddress = "" // TODO

    let proof = JSON.stringify({signal, root, nullifierHash, externalNullifier, solidityProof, verifierAddress});

    await save('../public/zkAnswer.proof', proof);
}

async function save (path, type) {
    await fs.writeFile(path, type.toString(), (err) => {
        if (err) throw err;
    });
    return true;
}

produceZKProof ();