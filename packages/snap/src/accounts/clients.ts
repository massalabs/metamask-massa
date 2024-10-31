import type { Client, WalletClient } from '@massalabs/massa-web3';
import { ClientFactory, ProviderType } from '@massalabs/massa-web3';

import { getActiveChainId, getActiveRPC } from '../active-chain';
import { getHDAccount } from './hd-deriver';

/**
 *
 * @param address
 * @param chainId
 */
export async function getClient(url?: string): Promise<Client | undefined> {
  const account = await getHDAccount();
  const rpc = url ?? (await getActiveRPC());
  const chain_id = await getActiveChainId();

  if (!account) {
    return undefined;
  }

  return await ClientFactory.createCustomClient(
    [{ url: rpc, type: ProviderType.PUBLIC }],
    chain_id,
    true,
    account,
  );
}

/**
 *
 * @param address
 * @param chainId
 */
export async function getClientWallet(
  url?: string,
): Promise<WalletClient | undefined> {
  const client = await getClient(url);
  if (!client) {
    return undefined;
  }
  return client.wallet();
}
