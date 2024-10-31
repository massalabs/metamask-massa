import { CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';

import { getActiveChainId, getActiveRPC } from '../active-chain';
import type { Handler } from './handler';

// url list
export type GetNodeUrlsResponse = string;

/**
 * @description Get the node urls for the current network
 * @returns The node urls for the current network
 */
export const getNodeUrl: Handler<void, GetNodeUrlsResponse> = async () => {
  const chain = await getActiveChainId();
  const url = await getActiveRPC();

  return url;
};
