import {
  getActiveChainId,
  getActiveMinimalFees,
  getActiveRPC,
} from '../active-chain';
import type { Handler } from './handler';

export type GetNetworkResponse = {
  network: string;
  chainId: string;
  minimalFees: string;
};

/**
 * @description Get the current network url
 * @returns The network url as a string
 */
export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  const url = await getActiveRPC();
  const chainId = await getActiveChainId();
  const minimalFees = await getActiveMinimalFees();
  return {
    network: url,
    chainId: chainId.toString(),
    minimalFees,
  };
};
