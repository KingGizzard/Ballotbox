import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof";
import { formatBytes32String } from "@ethersproject/strings";
import * as fs_ from 'fs/promises';
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });


async function produceZKProof () {
    const CID = "blah" //await fs_.readFile('../agent1/ipfs/cid.txt');
    const VerifierAddress = "blah" //await fs_.readFile('../blockchain/build/filecoin/verifier::hyperspace.address');

    const signal = formatBytes32String(CID);
    const externalNullifier = 1;
    const fullProof = await generateProof(identity, group, externalNullifier, signal, {
        zkeyFilePath: "../../static/semaphore.zkey",
        wasmFilePath: "../../static/semaphore.wasm"
    });
    const solidityProof = packToSolidityProof(fullProof.proof);
    const { nullifierHash } = fullProof.publicSignals;
    const verifierAddress = VerifierAddress.toString();
}

async function save (path, type) {
    await fs.writeFile(path, type.toString(), (err) => {
        if (err) throw err;
    });
    return true;
}

produceZKProof ();