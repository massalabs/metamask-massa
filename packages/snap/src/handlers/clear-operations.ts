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
