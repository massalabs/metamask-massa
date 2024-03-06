import { WalletClient } from '@massalabs/massa-web3';

import { addAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type ImportAccountParams = {
  privateKey: string;
  publicKey: string;
};

export type ImportAccountResponse = {
  address: string;
};

const coerceParams = (params: ImportAccountParams): ImportAccountParams => {
  if (!params.privateKey || typeof params.privateKey !== 'string') {
    throw new Error('Invalid params: privateKey must be a string');
  }
  if (!params.publicKey || typeof params.publicKey !== 'string') {
    throw new Error('Invalid params: publicKey must be a string');
  }
  return params;
};

export const importAccount: Handler<
  ImportAccountParams,
  ImportAccountResponse
> = async (params) => {
  const { privateKey } = coerceParams(params);
  const account = await WalletClient.getAccountFromSecretKey(privateKey);

  await addAccount(account);
  return { address: account.address! };
};
