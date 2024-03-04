import { getAccount, getActiveAccount } from "../accounts/manage-account";
import { getAccountTokens } from "../tokens";
import { Handler } from "./handler";

export type GetTokensParams = {
  address?: string;
}

export type GetTokensResponse = {
  tokens: string[];
}

export const getTokens: Handler<GetTokensParams, GetTokensResponse> = async (params) => {
  const account = (params?.address !== undefined) ? await getAccount(params.address!) : await getActiveAccount();

  if (!account) {
    throw new Error(`Account not found: ${params.address}`);
  }
  return {
    tokens: await getAccountTokens(account.address!),
  };
}
