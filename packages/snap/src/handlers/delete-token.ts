import { getActiveAccount } from '../accounts/manage-account';
import { removeAccountToken } from '../tokens';
import type { Handler } from './handler';

export type DeleteTokenParams = {
  accountAddress?: string;
  address: string;
};

export type DeleteTokenResponse = {
  response: 'OK' | 'ERROR';
  message?: string;
};

/**
 * @description Coerces the delete token parameters to the correct types
 * @param params - The delete token parameters (accountAddress is optional, defaults to the active account)
 * @returns The response of the operation
 */
const coerceParams = (params: DeleteTokenParams): DeleteTokenParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  if (params.accountAddress && typeof params.accountAddress !== 'string') {
    throw new Error('Invalid params: accountAddress must be a string');
  }
  return params;
};

/**
 * @description Deletes the token with the given address from the active account or the account with the given address
 * @param params - The delete token parameters (accountAddress is optional, defaults to the active account)
 * @returns The response of the operation
 */
export const deleteToken: Handler<
  DeleteTokenParams,
  DeleteTokenResponse
> = async (params) => {
  const { accountAddress, address } = coerceParams(params);
  const account = accountAddress ?? (await getActiveAccount()).address!;
  const res = await removeAccountToken(account, address);

  if (res) {
    return { response: 'OK' };
  }
  return { response: 'ERROR', message: 'Token not found' };
};
