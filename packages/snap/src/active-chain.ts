import { CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';

import { StateManager } from './state-manager';
import { DEFAULT_MINIMAL_FEES } from './handlers';

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

/**
 * @description Get the current network url
 * @returns Promise of the url as a string
 */
export async function getActiveRPC(): Promise<string> {
  const rpc = await StateManager.getState('activeRPC');

  if (!rpc) {
    await setActiveRPC(DefaultProviderUrls.MAINNET);
    return DefaultProviderUrls.MAINNET;
  }

  return rpc;
}

/**
 * @description Set the current network using a rpc URL
 * @param chainId - Chain id as a bigint
 */
export async function setActiveRPC(url: string) {
  await StateManager.setState('activeRPC', url);
}

/**
 * @description Get the current minimal fees
 * @returns Promise of the minimal fees as a string
 */
export async function getActiveMinimalFees(): Promise<string> {
  const minimalFees = await StateManager.getState('minimalFees');

  if (!minimalFees) {
    await setActiveMinimalFees(DEFAULT_MINIMAL_FEES);
    return DEFAULT_MINIMAL_FEES.toString();
  }

  return minimalFees;
}

/**
 * @description Get the current minimal fees
 * @returns Promise of the minimal fees as a string
 */
export async function setActiveMinimalFees(minimal_fees: string) {
  await StateManager.setState('minimalFees', minimal_fees.toString());
}
