import { StateManager } from "../state-manager";
import { IAccount, WalletClient } from "@massalabs/massa-web3";
import { getHDAccount } from "./hd-deriver";

export type Account = IAccount & { name: string };

export async function listAccounts(): Promise<Account[]> {
  const accounts: Account[] = await StateManager.getState("accounts") || [];
  const hdAccount = await getHDAccount();

  if (accounts.length === 0 || !accounts.find((a) => a.address === hdAccount.address)) {
    accounts.push({ ...hdAccount, name: "Account 0"});
    await StateManager.setState("accounts", accounts);
  }
  return accounts;
}

export async function getAccount(address: string): Promise<Account | undefined> {
  const accounts = await listAccounts();
  return accounts.find((a) => a.address === address);
}

export async function getAccountByName(name: string): Promise<Account | undefined> {
  const accounts = await listAccounts();
  return accounts.find((a) => a.name === name);
}

export async function generateNewAccount(name: string): Promise<Account> {
  const accounts = await listAccounts();
  const newAccount = await WalletClient.walletGenerateNewAccount();
  const toAdd = { ...newAccount, name };
  accounts.push(toAdd);
  await StateManager.setState("accounts", accounts);
  return toAdd;
}

export async function addAccount(account: IAccount): Promise<Account> {
  const accounts = await listAccounts();
  const toAdd = { ...account, name: `Account ${accounts.length}` };

  accounts.push(toAdd);
  await StateManager.setState("accounts", accounts);
  return toAdd;
}

export async function removeAccount(account: Account) {
  const accounts = await listAccounts();
  const index = accounts.findIndex((a) => a.address === account.address);
  if (index !== -1) {
    accounts.splice(index, 1);
    await StateManager.setState("accounts", accounts);
  }
}

export async function getActiveAccount(): Promise<Account> {
  const activeAccount = await StateManager.getState("activeAccount");
  if (!activeAccount) {
    const accounts = await listAccounts();
    StateManager.setState("activeAccount", accounts[0]);
    return accounts[0]!;
  }
  return activeAccount;
}

export async function setActiveAccount(account: Account) {
  await StateManager.setState("activeAccount", account);
}
