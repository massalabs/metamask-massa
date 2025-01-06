import { Account, PrivateKey } from '@massalabs/massa-web3';
import type { JsonSLIP10Node } from '@metamask/key-tree';
import varint from 'varint';

const KEYS_VERSION_NUMBER = 0;

export async function getHDAccount(): Promise<Account> {
  const secretKey = await retrieveSecretKey();
  return Account.fromPrivateKey(secretKey);
}

async function retrieveSecretKey(): Promise<PrivateKey> {
  const account = await retrieveSlip10Path();

  if (!account?.privateKey) {
    throw new Error('No private key found');
  }

  const bytes = new TextEncoder().encode(account.privateKey.slice(0, 32));

  // add version number to the key bytes
  const versionBytes = varint.encode(KEYS_VERSION_NUMBER);
  const keyBytes = new Uint8Array([...versionBytes, ...bytes]);
  return PrivateKey.fromBytes(keyBytes);
}

async function retrieveSlip10Path(): Promise<JsonSLIP10Node> {
  const entropy = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      curve: 'ed25519',
      path: ['m', "44'", "632'"],
    },
  });
  return entropy;
}
