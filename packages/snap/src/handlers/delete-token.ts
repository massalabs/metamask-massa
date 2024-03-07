import { removeAccountToken } from '../tokens';
import type { Handler } from './handler';

export type DeleteTokenParams = {
  accountAddress: string;
  address: string;
};

export type DeleteTokenResponse = {
  response: 'OK' | 'ERROR';
  message?: string;
};

const coerceParams = (params: DeleteTokenParams): DeleteTokenParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  if (!params.accountAddress || typeof params.accountAddress !== 'string') {
    throw new Error('Invalid params: accountAddress must be a string');
  }
  return params;
};

export const deleteToken: Handler<
  DeleteTokenParams,
  DeleteTokenResponse
> = async (params) => {
  const { accountAddress, address } = coerceParams(params);
  const res = await removeAccountToken(accountAddress, address);

  if (res) {
    return { response: 'OK' };
  }
  return { response: 'ERROR', message: 'Token not found' };
};
