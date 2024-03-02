import { getActiveAccount as activeAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type GetActiveAccountResponse = {
  name: string;
  address: string;
};

export const getActiveAccount: Handler<
  void,
  GetActiveAccountResponse
> = async () => {
  const account = await activeAccount();

  return {
    name: account.name,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    address: account.address!,
  };
};
