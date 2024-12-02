import { Address } from '@massalabs/massa-web3';
import { addAccountToken } from '../tokens';
import type { Handler } from './handler';
import { getProvider } from '../accounts/provider';

export type AddTokenParams = {
  address: string;
};

export type AddTokenResponse = {
  response: 'OK';
};

const validate = (params: AddTokenParams) => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  Address.fromString(params.address);
};

/**
 * @description Adds the token with the given address to the active account or the account with the given address
 * @param params - The add token parameters
 * @returns The response of the operation
 * @throws An error if the account is not found
 */
export const addToken: Handler<AddTokenParams, AddTokenResponse> = async (
  params,
) => {
  validate(params);
  const provider = await getProvider();
  await addAccountToken(provider.address, params.address);
  return { response: 'OK' };
};
