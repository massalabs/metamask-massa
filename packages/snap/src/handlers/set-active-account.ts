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

/**
 * @description Coerce the set active account parameters by ensuring the parameters are present and are the correct type
 * @param params - The set active account parameters
 * @returns The set active account parameters
 * @throws If the address is not present or is not a string
 */
const coerceParams = (
  params: SetActiveAccountParams,
): SetActiveAccountParams => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params;
};
/**
 * @description Sets the active account using the given address
 * @param params - The set active account parameters
 * @returns The active account name and address
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
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
