import type { Client, WalletClient } from '@massalabs/massa-web3';
import {
  CHAIN_ID,
  ClientFactory,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';

import { getActiveChainId } from '../active-chain';
import { getHDAccount } from './hd-deriver';

/**
 *
 * @param address
 * @param chainId
 */
export async function getClient(chainId?: bigint): Promise<Client | undefined> {
  const account = await getHDAccount();
  const chain = chainId ?? (await getActiveChainId());

  if (!account) {
    return undefined;
  }
  return await ClientFactory.createDefaultClient(
    chain === CHAIN_ID.MainNet
      ? DefaultProviderUrls.MAINNET
      : DefaultProviderUrls.BUILDNET,
    chain,
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
  chainId?: bigint,
): Promise<WalletClient | undefined> {
  const client = await getClient(chainId);
  if (!client) {
    return undefined;
  }
  return client.wallet();
}
