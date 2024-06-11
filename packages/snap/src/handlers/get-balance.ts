import { getHDAccount } from '../accounts/hd-deriver';
import { getClientWallet } from '../accounts/clients';
import type { Handler } from './handler';

export type GetBalanceParams = void;

export type GetBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

/**
 * @description Get the balance of the given address
 * @returns The final and candidate balances of the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getBalance: Handler<
  GetBalanceParams,
  GetBalanceResponse
> = async () => {
  const wallet = await getClientWallet();
  const address = (await getHDAccount()).address;

  if (!wallet || !address) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }
  const balance = await wallet.getAccountBalance(address);

  return {
    finalBalance: balance?.candidate?.toString() || '0',
    candidateBalance: balance?.candidate?.toString() || '0',
  };
};
