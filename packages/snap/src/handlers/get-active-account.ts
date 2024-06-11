import { getHDAccount } from 'src/accounts/hd-deriver';
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

  return {
    address: account.address!,
  };
};
