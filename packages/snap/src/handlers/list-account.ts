import type { IAccount } from '@massalabs/massa-web3';

import { getHDAccount } from '../accounts/hd-deriver';
import type { Handler } from './handler';

export type ListAccountsResponseItem = Pick<IAccount, 'address'> & {
  name: string;
};

export type ListAccountsResponse = ListAccountsResponseItem[];

/**
 * @description Lists the accounts in the wallet
 * @returns The accounts in the wallet
 */
export const listAccounts: Handler<void, ListAccountsResponse> = async () => {
  const accounts = await getHDAccount();

  return [
    {
      address: accounts.address,
      name: 'Account 1',
    },
  ];
};
