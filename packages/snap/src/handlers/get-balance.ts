import { getProvider } from '../accounts/provider';
import type { Handler } from './handler';
import { Address } from '@massalabs/massa-web3';

export type GetBalanceParams = {
  address: string;
};

export type GetBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

const validate = (params: GetBalanceParams) => {
  if (!params.address || typeof params.address !== 'string') {
    throw new Error('Invalid params: address must be a string');
  }
  Address.fromString(params.address);
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
  validate(params);

  const provider = await getProvider();

  if (provider.address !== params.address) {
    throw new Error(`Account not found: ${params.address}`);
  }
  const [final, candidate] = await Promise.all([
    provider.balance(true),
    provider.balance(false),
  ]);

  return {
    finalBalance: final.toString(),
    candidateBalance: candidate.toString(),
  };
};
