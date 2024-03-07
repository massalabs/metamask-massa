import { getAccount, getActiveAccount } from '../accounts/manage-account';
import { addAccountToken } from '../tokens';
import type { Handler } from './handler';

export type AddTokenParams = {
  address: string;
  accountAddress?: string;
};

export type AddTokenResponse = {
  address: string;
  accountAddress: string;
};
/**
 * @description Coerces the add token parameters to the correct types
 * @param params - The add token parameters (accountAddress is optional, defaults to the active account)
 * @returns  The coerced add token parameters
 * @throws An error if the address is not a string
 */
const coerceParams = (params: AddTokenParams): AddTokenParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  if (params.accountAddress && typeof params.accountAddress !== 'string') {
    throw new Error('Invalid params: accountAddress must be a string');
  }
  return params;
};

/**
 * @description Adds the token with the given address to the active account or the account with the given address
 * @param params - The add token parameters (accountAddress is optional, defaults to the active account)
 * @returns The response of the operation
 * @throws An error if the account is not found
 */
export const addToken: Handler<AddTokenParams, AddTokenResponse> = async (
  params,
) => {
  const { accountAddress, address } = coerceParams(params);
  const account = accountAddress
    ? await getAccount(accountAddress)
    : await getActiveAccount();

  if (!account) {
    throw new Error('Account not found');
  }
  await addAccountToken(account!.address!, address);
  return {
    address,
    accountAddress: account!.address!,
  };
};
