import openpgp from 'openpgp';
import fs from 'fs';

async function generate() {
  openpgp.generateKey({
    curve: 'ed25519',
    userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }],
    passphrase: 'super long and hard to guess secret'
  }).then((keys) => {
    fs.writeFileSync('private.key', keys.privateKey);
    fs.writeFileSync('public.key', keys.publicKey);
  })
}

generate();