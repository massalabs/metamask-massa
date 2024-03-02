import { StateManager } from "./state-manager";

export type AccountToken = { name: string, address: string, decimals: number };
export type AccountsTokens = Record<string, AccountToken[]>;

export async function getAccountTokens(address: string): Promise<AccountToken[]> {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};

  if (!accountsTokens) {
    await StateManager.setState("accountTokens", {});
    return [];
  }

  return accountsTokens[address] || [];
}

export async function addAccountToken(address: string, token: AccountToken) {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};
  const tokens = accountsTokens[address] || [];

  if (tokens.find((t) => t.address === token.address)) {
    return;
  }
  tokens.push(token);
  accountsTokens[address] = tokens;
  await StateManager.setState("accountTokens", accountsTokens);
}

export async function removeAccountToken(account: string, tokenAddress: string) {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};
  const tokens = accountsTokens[account] || [];
  const index = tokens.findIndex((t) => t.address === tokenAddress);

  if (index !== -1) {
    tokens.splice(index, 1);
    accountsTokens[account] = tokens;
    await StateManager.setState("accountTokens", accountsTokens);
    return true;
  }
  return false;
}
