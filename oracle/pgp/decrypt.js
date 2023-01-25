import * as openpgp from 'openpgp';
import fs from 'fs';

const publicKeyArmored = fs.readFileSync('public.key', 'utf8');
const privateKeyArmored = fs.readFileSync('private.key', 'utf8');

const decrypt = async (encrypted, publicKey, privateKey) => {
  const message = await openpgp.readMessage({
    armoredMessage: encrypted
  });
  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    verificationKeys: publicKey,
    decryptionKeys: privateKey
  });
  return decrypted;
}

const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase: 'super long and hard to guess secret'
});

const encrypted = fs.readFileSync('secret-encrypted.txt', 'utf-8');
const decrypted = await decrypt(encrypted, publicKey, privateKey);
console.log('decrypted:', decrypted);