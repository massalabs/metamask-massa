import { StateManager } from './state-manager';

// Account address -> OperationId[]
export type AccountsOperations = Record<string, string[]>;

/**
 * @description Get operations for the given account address
 * @param address - Account address as a string prefixed with 'AU'
 * @returns Array of operation ids as as string array prefixed with 'OP'
 */
export async function getAccountOperations(address: string): Promise<string[]> {
  if (!address || !address.startsWith('AU')) {
    throw new Error('Invalid params: address must be a string and start with AU');
  }
  const accountsOperations: AccountsOperations =
    (await StateManager.getState('accountOperations')) || {};

  if (!accountsOperations) {
    await StateManager.setState('accountOperations', {});
    return [];
  }

  return accountsOperations[address] || [];
}

/**
 * @description Add operation to account with the given operation id for the given account address
 * Does nothing if the operation is already added
 * @param address - Account address as a string prefixed with 'AU'
 * @param operation - Operation id as a string prefixed with 'OP'
 */
export async function addAccountOperation(address: string, operation: string) {
  if (!address || !address.startsWith('AU')) {
    throw new Error('Invalid params: address must be a string and start with AU');
  }

  if (!operation || !operation.startsWith('OP')) {
    throw new Error('Invalid params: operation must be a string and start with OP');
  }

  const accountsOperations: AccountsOperations =
    (await StateManager.getState('accountOperations')) || {};
  const operations = accountsOperations[address] || [];

  if (operations.find((t) => t === operation)) {
    return;
  }
  operations.push(operation);
  accountsOperations[address] = operations;
  await StateManager.setState('accountOperations', accountsOperations);
}

/**
 * @description Remove operation from account with the given operation id for the given account address
 * @param account - Account address as a string prefixed with 'AU'
 */
export async function clearAccountOperations(account: string) {
  if (!account || !account.startsWith('AU')) {
    throw new Error('Invalid params: address must be a string and start with AU');
  }
  const accountsOperations: AccountsOperations =
    (await StateManager.getState('accountOperations')) || {};
  accountsOperations[account] = [];

  await StateManager.setState('accountOperations', accountsOperations);
}
