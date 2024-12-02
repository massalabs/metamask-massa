import { getHDAccount } from '../accounts/hd-deriver';
import { removeAccountToken } from '../tokens';
import type { Handler } from './handler';

export type DeleteTokenParams = {
  address: string;
};

export type DeleteTokenResponse = {
  response: 'OK' | 'ERROR';
  message?: string;
};

const validate = (params: DeleteTokenParams) => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
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
  validate(params);
  const { address } = await getHDAccount();
  const ok = await removeAccountToken(address.toString(), params.address);

  if (ok) {
    return { response: 'OK' };
  }
  return { response: 'ERROR', message: 'Token not found' };
};
