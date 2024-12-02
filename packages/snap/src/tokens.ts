import { StateManager } from './state-manager';

export type AccountsTokens = Record<string, string[]>;

/**
 * @description Get tokens for the given account address
 * @param address - Account address as a string prefixed with 'AU'
 * @returns Array of token smart contract addresses as strings prefixed with 'AS'
 */
export async function getAccountTokens(address: string): Promise<string[]> {
  if (!address || !address.startsWith('AU')) {
    throw new Error(
      'Invalid params: address must be a string and start with AU',
    );
  }

  const accountsTokens: AccountsTokens =
    (await StateManager.getState('accountTokens')) || {};

  if (!accountsTokens) {
    await StateManager.setState('accountTokens', {});
    return [];
  }

  return accountsTokens[address] || [];
}

/**
 * @description Add token to account with the given token smart contract address for the given account address
 * @param address - Account address as a string prefixed with 'AU'
 * @param token - Token smart contract address as a string prefixed with 'AS'
 */
export async function addAccountToken(account: string, token: string) {
  if (!account.startsWith('AU')) {
    throw new Error(
      'Invalid params: address must be a string and start with AU',
    );
  }

  if (!token.startsWith('AS')) {
    throw new Error('Invalid params: token must be a string and start with AS');
  }

  const accountsTokens: AccountsTokens =
    (await StateManager.getState('accountTokens')) || {};
  const tokens = accountsTokens[account] || [];

  if (tokens.some((t) => t === token)) {
    return;
  }
  tokens.push(token);
  accountsTokens[account] = tokens;
  await StateManager.setState('accountTokens', accountsTokens);
}

/**
 * @description Remove token from account with the given token smart contract address for the given account address
 * @param account - Account address as a string prefixed with 'AU'
 * @param tokenAddress - Token smart contract address as a string prefixed with 'AS'
 * @returns True if the token was removed, false if the token was not found
 */
export async function removeAccountToken(
  account: string,
  tokenAddress: string,
) {
  if (!account.startsWith('AU')) {
    throw new Error(
      'Invalid params: address must be a string and start with AU',
    );
  }

  if (!tokenAddress.startsWith('AS')) {
    throw new Error('Invalid params: token must be a string and start with AS');
  }

  const accountsTokens: AccountsTokens =
    (await StateManager.getState('accountTokens')) || {};
  const tokens = accountsTokens[account] || [];
  const index = tokens.findIndex((t) => t === tokenAddress);

  if (index !== -1) {
    tokens.splice(index, 1);
    accountsTokens[account] = tokens;
    await StateManager.setState('accountTokens', accountsTokens);
    return true;
  }
  return false;
}
