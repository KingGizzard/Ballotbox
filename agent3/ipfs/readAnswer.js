import { create } from 'ipfs-core'

const cid = process.argv[2];

async function main () {
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
