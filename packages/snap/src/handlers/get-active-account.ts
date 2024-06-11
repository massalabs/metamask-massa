import { getHDAccount } from '../accounts/hd-deriver';
import type { Handler } from './handler';

export type GetActiveAccountResponse = {
  address: string;
};

/**
 * @description Gets the active account
 * @returns The active account address
 */
export const getActiveAccount: Handler<
  void,
  GetActiveAccountResponse
> = async () => {
  const account = await getHDAccount();

  if (!account) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }

  return {
    address: account.address!,
  };
};
