import { CHAIN_ID, Client, ClientFactory, DefaultProviderUrls, WalletClient } from "@massalabs/massa-web3";
import { getActiveAccount, listAccounts } from "./manage-account";
import { getActiveChainId } from "../active-chain";

export async function getClients(chainId?: bigint): Promise<Client[]> {
  const accounts = await listAccounts();
  const chain = chainId || (await getActiveChainId());
  const clients = await Promise.all(accounts.map(async (account) => {
    const client = await ClientFactory.createDefaultClient(
      chain === CHAIN_ID.MainNet ? DefaultProviderUrls.MAINNET : DefaultProviderUrls.BUILDNET,
      chain,
      true,
      account,
    );
    return client;
  }));
  return clients;
}

export async function getClient(address: string, chainId?: bigint): Promise<Client | undefined> {
  const accounts = await listAccounts();
  const chain = chainId || (await getActiveChainId());

  const account = accounts.find((a) => a.address === address);
  if (!account) {
    return;
  }
  return await ClientFactory.createDefaultClient(
    chain === CHAIN_ID.MainNet ? DefaultProviderUrls.MAINNET : DefaultProviderUrls.BUILDNET,
    chain,
    true,
    account,
  );
}

export async function getActiveClient(): Promise<Client> {
  const activeAccount = await getActiveAccount();
  const chain = await getActiveChainId();

  return await ClientFactory.createDefaultClient(
    chain === CHAIN_ID.MainNet ? DefaultProviderUrls.MAINNET : DefaultProviderUrls.BUILDNET,
    chain,
    true,
    activeAccount,
  );
}

export async function getClientsWallets(chainId?: bigint): Promise<WalletClient[]> {
  const clients = await getClients(chainId);
  return clients.map((client) => client.wallet());
}

export async function getClientWallet(address: string, chainId?: bigint): Promise<WalletClient | undefined> {
  const client = await getClient(address, chainId);
  if (!client) {
    return;
  }
  return client.wallet();
}

export async function getActiveClientWallet(): Promise<WalletClient> {
  const client = await getActiveClient();
  return client.wallet();
}
