import { create } from 'ipfs-core'
import * as fs_ from 'fs/promises';

async function main () {
    const cid = await fs_.readFile('../../agent1/ipfs/cid.txt');
    const CID = cid.toString();

    const node = await create()

    const content = await readFile(node, CID);

    console.log('Added file contents:', content);
}

const readFile = async (ipfs, cid) => {
    const decoder = new TextDecoder();
    let content = '';

    for await (const chunk of ipfs.cat(cid)) {
        content += decoder.decode(chunk, {
        stream: true
        })
    }

    return content
}

main()
