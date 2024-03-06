import { getAccount, getActiveAccount } from '../accounts/manage-account';
import { getAccountOperations } from '../operations';
import type { Handler } from './handler';

export type GetOperationsParams = {
  address?: string;
};

export type GetOperationsResponse = {
  operations: string[];
};

export const getOperations: Handler<
  GetOperationsParams,
  GetOperationsResponse
> = async (params) => {
  const account =
    params?.address !== undefined
      ? await getAccount(params.address)
      : await getActiveAccount();

  if (!account) {
    throw new Error(
      `Account not found: ${params?.address ?? '(no address provided)'}`,
    );
  }
  return {
    operations: await getAccountOperations(account.address!),
  };
};
