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

const coerceParams = (params: AddTokenParams): AddTokenParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  if (params.accountAddress && typeof params.accountAddress !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params;
};

export const addToken: Handler<AddTokenParams, AddTokenResponse> = async (
  params,
) => {
  const { accountAddress, address } = coerceParams(params);
  const account =
    (await getAccount(accountAddress!)) || (await getActiveAccount());
  await addAccountToken(account.address!, address);
  return {
    address,
    accountAddress: account.address!,
  };
};
