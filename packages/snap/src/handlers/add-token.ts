import { getHDAccount } from 'src/accounts/hd-deriver';
import { addAccountToken } from '../tokens';
import type { Handler } from './handler';

export type AddTokenParams = {
  address: string;
};

export type AddTokenResponse = {
  address: string;
  accountAddress: string;
};
/**
 * @description Coerces the add token parameters to the correct types
 * @param params - The add token parameters
 * @returns  The coerced add token parameters
 * @throws An error if the address is not a string
 */
const coerceParams = (params: AddTokenParams): AddTokenParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params;
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
  const { address } = coerceParams(params);
  const account = await getHDAccount();

  if (!account) {
    throw new Error('Not logged in to metamask. Please log in and try again.');
  }

  await addAccountToken(account!.address!, address);

  return {
    address,
    accountAddress: account!.address!,
  };
};
