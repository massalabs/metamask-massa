import type { Client, WalletClient } from '@massalabs/massa-web3';
import { ClientFactory, ProviderType } from '@massalabs/massa-web3';

import { getHDAccount } from './hd-deriver';
import { getActiveNetwork } from '../active-chain';

export async function getClient(): Promise<Client | undefined> {
  const account = await getHDAccount();
  const networkInfos = await getActiveNetwork();

  if (!account) {
    return undefined;
  }

  return ClientFactory.createCustomClient(
    [{ url: networkInfos.rpcUrl, type: ProviderType.PUBLIC }],
    BigInt(networkInfos.chainId),
    true,
    account,
  );
}

export async function getClientWallet(): Promise<WalletClient | undefined> {
  const client = await getClient();
  if (!client) {
    return undefined;
  }
  return client.wallet();
}
