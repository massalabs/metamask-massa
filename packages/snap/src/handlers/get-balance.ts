import { getClientWallet } from '../accounts/clients';
import { getHDAccount } from '../accounts/hd-deriver';
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
 * @param params
 * @description Get the balance of the given address
 * @returns The final and candidate balances of the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getBalance: Handler<GetBalanceParams, GetBalanceResponse> = async (
  params,
) => {
  const wallet = await getClientWallet();
  const { address } = await getHDAccount();
  const requestedAddress = coerceParams(params);

  if (!wallet || !address) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }
  if (address !== requestedAddress) {
    throw new Error(`Account not found: ${requestedAddress}`);
  }
  const balance = await wallet.getAccountBalance(address);

  return {
    finalBalance: balance?.final?.toString() || '0',
    candidateBalance: balance?.candidate?.toString() || '0',
  };
};
