import { StateManager } from "./state-manager";

export type AccountsTokens = Record<string, string[]>;

export async function getAccountTokens(address: string): Promise<string[]> {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};

  if (!accountsTokens) {
    await StateManager.setState("accountTokens", {});
    return [];
  }

  return accountsTokens[address] || [];
}

export async function addAccountToken(address: string, token: string) {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};
  const tokens = accountsTokens[address] || [];

  if (tokens.find((t) => t === token)) {
    return;
  }
  tokens.push(token);
  accountsTokens[address] = tokens;
  await StateManager.setState("accountTokens", accountsTokens);
}

export async function removeAccountToken(account: string, tokenAddress: string) {
  const accountsTokens: AccountsTokens = await StateManager.getState("accountTokens") || {};
  const tokens = accountsTokens[account] || [];
  const index = tokens.findIndex((t) => t === tokenAddress);

  if (index !== -1) {
    tokens.splice(index, 1);
    accountsTokens[account] = tokens;
    await StateManager.setState("accountTokens", accountsTokens);
    return true;
  }
  return false;
}
