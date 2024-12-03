import { getHDAccount } from '../accounts/hd-deriver';
import { clearAccountOperations } from '../operations';
import type { Handler } from './handler';

export type ClearOperationsParams = void;

export type ClearOperationsResponse = {
  response: 'OK' | 'ERROR' | 'REFUSED';
  message?: string;
};
/**
 * @description Clears the operations for the active account or the account with the given address
 * @returns The response of the operation (OK if successful, ERROR if the account to clear is not found)
 */
export const clearOperations: Handler<
  ClearOperationsParams,
  ClearOperationsResponse
> = async () => {
  const account = await getHDAccount();
  await clearAccountOperations(account.address.toString());
  return { response: 'OK' };
};
