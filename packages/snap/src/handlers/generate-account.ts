import { generateNewAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type GenerateAccountParams = {
  name: string;
};

export type GenerateAccountResponse = {
  name: string;
  address: string;
};

const coerceParams = (params: GenerateAccountParams): GenerateAccountParams => {
  if (!params.name || typeof params.name !== 'string') {
    throw new Error('Invalid params: name must be a string');
  }
  return params;
};

/**
 * @description Generates a new account with the given name
 * @param params - The generate account parameters
 * @returns The generated account name and address
 */
export const generateAccount: Handler<
  GenerateAccountParams,
  GenerateAccountResponse
> = async (params) => {
  const { name } = coerceParams(params);
  const account = await generateNewAccount(name);

  return {
    name: account.name,
    address: account.address!,
  };
};
