import { getClientWallet } from '../accounts/clients';
import type { Handler } from './handler';

export type GetBalanceParams = {
  address: string;
};

export type GetBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

/**
 * @description Coerces the get balance parameters to the expected format
 * @param params - The get balance parameters
 * @returns The coerced parameters
 * @throws If the parameters are invalid
 */
const coerceParams = (params: GetBalanceParams): string => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params.address;
};

/**
 * @description Get the balance of the given address
 * @param params - The address to get the balance of
 * @returns The final and candidate balances of the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getBalance: Handler<GetBalanceParams, GetBalanceResponse> = async (
  params,
) => {
  const address = coerceParams(params);
  const wallet = await getClientWallet(address);

  if (!wallet) {
    throw new Error(`Account not found: ${address}`);
  }
  const balance = await wallet.getAccountBalance(address);

  return {
    finalBalance: balance?.candidate?.toString() || '0',
    candidateBalance: balance?.candidate?.toString() || '0',
  };
};
