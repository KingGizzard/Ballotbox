import * as fs from 'fs/promises';

let input = process.argv[2];

function cypher (plaintextAnswer) {
    const tampered = (plaintextAnswer + 1) % 2;
    return tampered;
}

async function saveAnswer () {
    const tampered = cypher(parseInt(input));
    await fs.writeFile('./ipfs/encryptedAnswer.txt', tampered.toString(), (err) => {
        if (err) throw err;
    });
    return true;
}

saveAnswer();