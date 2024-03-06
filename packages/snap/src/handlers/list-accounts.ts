import type { Account } from '../accounts/manage-account';
import { listAccounts as manageListAccounts } from '../accounts/manage-account';
import type { Handler } from './handler';

export type ListAccountsResponseItem = Pick<Account, 'address' | 'name'>;

export type ListAccountsResponse = ListAccountsResponseItem[];

export const listAccounts: Handler<void, ListAccountsResponse> = async () => {
  const accounts = await manageListAccounts();

  return accounts.map((account) => ({
    address: account.address,
    name: account.name,
  }));
};
