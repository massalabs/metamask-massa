import { StateManager } from "./state-manager";

// Account address -> OperationId[]
export type AccountsOperations = Record<string, string[]>;

export async function getAccountOperations(address: string): Promise<string[]> {
  const accountsOperations: AccountsOperations = await StateManager.getState("accountOperations") || {};

  if (!accountsOperations) {
    await StateManager.setState("accountOperations", {});
    return [];
  }

  return accountsOperations[address] || [];
}

export async function addAccountOperation(address: string, operation: string) {
  const accountsOperations: AccountsOperations = await StateManager.getState("accountOperations") || {};
  const operations = accountsOperations[address] || [];

  if (operations.find((t) => t === operation)) {
    return;
  }
  operations.push(operation);
  accountsOperations[address] = operations;
  await StateManager.setState("accountOperations", accountsOperations);
}

export async function clearAccountOperations(account: string) {
  const accountsOperations: AccountsOperations = await StateManager.getState("accountOperations") || {};
  accountsOperations[account] = [];

  await StateManager.setState("accountOperations", accountsOperations);
}
