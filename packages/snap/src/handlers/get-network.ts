import { getActiveChainId } from '../active-chain';
import type { Handler } from './handler';

export type GetNetworkResponse = {
  network: string; // chainId
};

/**
 * @description Get the current network chain id
 * @returns The network chain id as a string
 */
export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  const chainId = await getActiveChainId();
  return {
    network: chainId.toString(),
  };
};
