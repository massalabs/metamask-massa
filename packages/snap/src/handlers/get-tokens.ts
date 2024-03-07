import { getAccount, getActiveAccount } from '../accounts/manage-account';
import { getAccountTokens } from '../tokens';
import type { Handler } from './handler';

export type GetTokensParams = {
  address?: string;
};

export type GetTokensResponse = {
  tokens: string[];
};

/**
 * @description Gets the tokens for the active account or the account with the given address
 * @param params - The get tokens parameters (optional address, defaults to the active account)
 * @returns The tokens registered for the account
 * @throws If the account is not found (usually due to not being imported in metamask)
 */
export const getTokens: Handler<GetTokensParams, GetTokensResponse> = async (
  params,
) => {
  const account =
    params?.address !== undefined
      ? await getAccount(params.address)
      : await getActiveAccount();

  if (!account) {
    throw new Error(`Account not found: ${params.address}`);
  }
  return {
    tokens: await getAccountTokens(account.address!),
  };
};
