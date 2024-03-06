import { getAccount, removeAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type DeleteAccountParams = {
  address: string;
};

export type DeleteAccountResponse = {
  response: 'OK' | 'ERROR' | 'REFUSED';
  message?: string;
};

export const deleteAccount: Handler<
  DeleteAccountParams,
  DeleteAccountResponse
> = async (params) => {
  const account = await getAccount(params.address);

  if (!account) {
    return {
      response: 'ERROR',
      message: `Account not found: ${params.address}`,
    };
  }
  await removeAccount(account);
  return { response: 'OK' };
};
