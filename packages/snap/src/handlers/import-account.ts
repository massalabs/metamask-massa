import { WalletClient } from '@massalabs/massa-web3';

import { addAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type ImportAccountParams = {
  privateKey: string;
  publicKey: string;
};

export type ImportAccountResponse = {
  response: 'OK' | 'ERROR';
  message?: string;
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

/**
 * @description Imports an account using the given private key
 * @param params - The import account parameters
 * @returns The imported account address
 */
export const importAccount: Handler<
  ImportAccountParams,
  ImportAccountResponse
> = async (params) => {
  try {
    const { privateKey } = coerceParams(params);
    const account = await WalletClient.getAccountFromSecretKey(privateKey);

    await addAccount(account);
    return { response: "OK" };
  } catch (error: any) {
    return { response: "ERROR", message: error.message };
  }
};
