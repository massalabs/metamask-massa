import { CHAIN_ID } from '@massalabs/massa-web3';

import { StateManager } from './state-manager';

/**
 * @description Get the current network chain id
 * @returns Promise of the chain id as a bigint
 */
export async function getActiveChainId(): Promise<bigint> {
  const chain = await StateManager.getState('activeChainId');

  if (!chain) {
    await StateManager.setState('activeChainId', CHAIN_ID.MainNet.toString());
    return CHAIN_ID.MainNet;
  }
  return BigInt(chain);
}

/**
 * @description Set the current network using a chain id
 * @param chainId - Chain id as a bigint
 */
export async function setActiveChainId(chainId: bigint) {
  await StateManager.setState('activeChainId', chainId.toString());
}
