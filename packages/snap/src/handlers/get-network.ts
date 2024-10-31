import { getActiveChainId, getActiveRPC } from '../active-chain';
import type { Handler } from './handler';

export type GetNetworkResponse = {
  network: string; // chainId
};

/**
 * @description Get the current network url
 * @returns The network url as a string
 */
export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  const url = await getActiveRPC();
  return {
    network: url,
  };
};
