import { getHDAccount } from '../accounts/hd-deriver';
import { getAccountOperations } from '../operations';
import type { Handler } from './handler';

export type GetOperationsParams = void;

export type GetOperationsResponse = {
  operations: string[];
};

/**
 * @description Gets the operations for the active account or the account with the given address
 * @returns The operations registered for the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getOperations: Handler<
  GetOperationsParams,
  GetOperationsResponse
> = async () => {
  const { address } = await getHDAccount();

  return {
    operations: await getAccountOperations(address.toString()),
  };
};
