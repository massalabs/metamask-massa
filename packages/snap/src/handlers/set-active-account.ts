import {
  setActiveAccount as activeAccount,
  getAccount,
} from '../accounts/manage-account';
import type { Handler } from './handler';

export type SetActiveAccountParams = {
  address: string;
};

export type SetActiveAccountResponse = {
  name: string;
  address: string;
};

const coerceParams = (
  params: SetActiveAccountParams,
): SetActiveAccountParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params;
};

export const setActiveAccount: Handler<
  SetActiveAccountParams,
  SetActiveAccountResponse
> = async (params) => {
  const { address } = coerceParams(params);
  const account = await getAccount(address);

  if (!account) {
    throw new Error(`Account not found: ${address}`);
  }
  await activeAccount(account);
  return {
    name: account.name,
    address,
  };
};
