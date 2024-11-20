import { getActiveRPC } from '../active-chain';
import type { Handler } from './handler';

// url list
export type GetNodeUrlsResponse = string;

/**
 * @description Get the node urls for the current network
 * @returns The node urls for the current network
 */
export const getNodeUrl: Handler<void, GetNodeUrlsResponse> = async () => {
  return getActiveRPC();
};
