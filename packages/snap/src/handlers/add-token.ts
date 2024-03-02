import { getAccount, getActiveAccount } from "../accounts/manage-account";
import { AccountToken, addAccountToken } from "../tokens";
import { Handler } from "./handler";

export type AddTokenParams = AccountToken & {
  accountAddress?: string;
};
export type AddTokenResponse = AccountToken;

const coerceParams = (params: AddTokenParams): AddTokenParams => {
  if (!params.address || typeof params.address !== "string") {
    throw new Error("Invalid params: address must be a string");
  }
  if (!params.name || typeof params.name !== "string") {
    throw new Error("Invalid params: name must be a string");
  }
  if (!params.decimals || typeof params.decimals !== "number") {
    throw new Error("Invalid params: decimals must be a number");
  }
  if (params.accountAddress && typeof params.accountAddress !== "string") {
    throw new Error("Invalid params: address must be a string");
  }
  return params;
}

export const addToken: Handler<AddTokenParams, AddTokenResponse> = async (params) => {
  const { accountAddress, ...toAdd } = coerceParams(params);
  const account = await getAccount(accountAddress!) || await getActiveAccount();
  await addAccountToken(account.address!, toAdd);
  return toAdd;
}
