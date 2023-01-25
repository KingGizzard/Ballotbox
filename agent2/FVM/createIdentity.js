import { Identity } from "@semaphore-protocol/identity"
import * as fs from 'fs/promises';

const agentName = process.argv[2];

export async function createIdentity() {
    const { trapdoor, nullifier, commitment } = new Identity();
    await save('./private/trapdoor.priv', trapdoor);
    await save('./private/nullifier.priv', nullifier);
    await save('./public/commitment.pub', commitment);
    return { trapdoor, nullifier, commitment };
}

async function save (path, type) {
    await fs.writeFile(path, type.toString(), (err) => {
        if (err) throw err;
    });
    return true;
};