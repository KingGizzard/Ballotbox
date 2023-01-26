import { Identity } from "@semaphore-protocol/identity"
import * as fs from 'fs/promises';

async function createDummies() {
    for(var i = 0; i < 3; i++){
        const { trapdoor, nullifier, commitment } = new Identity();
        await save('trapdoor.priv', i, trapdoor);
        await save('nullifier.priv', i, nullifier);
        await save('committment.pub', i, commitment);
    }
}

async function save (path, index, type) {
    await fs.writeFile('./utils/dummies/dummies_' + index + '_' + path, type.toString(), (err) => {
        if (err) throw err;
    });
    return true;
};

createDummies()