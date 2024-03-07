import { getAccount, removeAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type DeleteAccountParams = {
  address: string;
};

export type DeleteAccountResponse = {
  response: 'OK' | 'ERROR' | 'REFUSED';
  message?: string;
};

/**
 * @description Deletes the account with the given address from the active account or the account with the given address
 * @param params - The delete account parameters
 * @returns The response of the operation (OK if successful, ERROR if the account to delete is not found)
 */
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
