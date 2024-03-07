import { getAccount, getActiveAccount } from '../accounts/manage-account';
import { clearAccountOperations } from '../operations';
import type { Handler } from './handler';

export type ClearOperationsParams = {
  address?: string;
};

export type ClearOperationsResponse = {
  response: 'OK' | 'ERROR' | 'REFUSED';
  message?: string;
};
/**
 * @description Clears the operations for the active account or the account with the given address
 * @param params - The clear operations parameters (optional address, defaults to the active account)
 * @returns The response of the operation (OK if successful, ERROR if the account to clear is not found)
 */
export const clearOperations: Handler<
  ClearOperationsParams,
  ClearOperationsResponse
> = async (params) => {
  const account = params.address
    ? await getAccount(params.address)
    : await getActiveAccount();

  if (!account) {
    return {
      response: 'ERROR',
      message: `Account not found: ${params.address ?? 'no account provided'}`,
    };
  }
  await clearAccountOperations(account.address!);
  return { response: 'OK' };
};
