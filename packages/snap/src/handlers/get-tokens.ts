import { getHDAccount } from 'src/accounts/hd-deriver';
import { getAccountTokens } from '../tokens';
import type { Handler } from './handler';

export type GetTokensParams = void;

export type GetTokensResponse = {
  tokens: string[];
};

/**
 * @description Gets the tokens for the active account or the account with the given address
 * @returns The tokens registered for the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getTokens: Handler<
  GetTokensParams,
  GetTokensResponse
> = async () => {
  const account = await getHDAccount();

  if (!account) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }
  return {
    tokens: await getAccountTokens(account.address!),
  };
};
