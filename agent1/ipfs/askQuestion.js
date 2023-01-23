import { create } from 'ipfs-core';
import * as fs from 'fs/promises';

async function main () {
    const question = await fs.readFile("./ipfs/question.txt", "utf-8");

    const node = await create();

    const file = await node.add({
        path: 'question.txt',
        content: new TextEncoder().encode(question)
    });

    try {
        file.cid.toUpperCase();
    } catch(error) {}

    await saveCID(file.cid.toString());
}

async function saveCID (CID) {
    await fs.writeFile('./ipfs/cid.txt', CID, (err) => {
        if (err) throw err;
    });
    return true;
}

main();