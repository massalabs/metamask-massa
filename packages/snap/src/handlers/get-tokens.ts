import { getHDAccount } from '../accounts/hd-deriver';
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
  const { address } = await getHDAccount();
  return {
    tokens: await getAccountTokens(address.toString()),
  };
};
