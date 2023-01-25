import * as openpgp from 'openpgp';
import fs from 'fs';

const publicKeyArmored = fs.readFileSync('public.key', 'utf8');
console.log('public key armored:', publicKeyArmored)

const encrypt = async (message) => {
  // console.log('message:', message);
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys: publicKey,
  });

  return encrypted;
}

const plainData = fs.readFileSync('secret.txt', 'utf-8');
const encrypted = await encrypt(plainData);
console.log('encrypted:', encrypted);
fs.writeFileSync('secret-encrypted.txt', encrypted);