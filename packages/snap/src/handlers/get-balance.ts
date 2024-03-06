import { getClientWallet } from '../accounts/clients';
import type { Handler } from './handler';

export type GetBalanceParams = {
  address: string;
};

export type GetBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

const coerceParams = (params: GetBalanceParams): string => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  return params.address;
};

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
