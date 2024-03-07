import { getAccount, getActiveAccount } from '../accounts/manage-account';
import { getAccountOperations } from '../operations';
import type { Handler } from './handler';

export type GetOperationsParams = {
  address?: string;
};

export type GetOperationsResponse = {
  operations: string[];
};

/**
 * @description Gets the operations for the active account or the account with the given address
 * @param params - The get operations parameters (optional address, defaults to the active account)
 * @returns The operations registered for the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
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
