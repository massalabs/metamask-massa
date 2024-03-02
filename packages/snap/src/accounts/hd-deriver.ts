import { utils, KEYS_VERSION_NUMBER, SECRET_KEY_PREFIX, WalletClient, IAccount, SecretKey } from '@massalabs/massa-web3';
import { JsonSLIP10Node } from '@metamask/key-tree';

export async function getHDAccount(): Promise<IAccount> {
  const secretKey = await retrieveSecretKey();
  return WalletClient.getAccountFromSecretKey(secretKey);
}

async function retrieveSecretKey(): Promise<string> {
  const account = await retrieveSlip10Path();

  if (!account?.privateKey) {
    throw new Error('No private key found');
  }

  const bytes = new TextEncoder().encode(account.privateKey.slice(0, 32));

  const version = Uint8Array.from(
    utils.crypto.varintEncode(KEYS_VERSION_NUMBER),
  );
  const encoded = utils.crypto.base58Encode(
    Uint8Array.from([...version, ...bytes]),
  );
  return SECRET_KEY_PREFIX + encoded;
}

async function retrieveSlip10Path(): Promise<JsonSLIP10Node> {
  const entropy = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      curve: 'ed25519',
      path: ['m', "44'", "3'"],
    },
  });
  return entropy;
}
