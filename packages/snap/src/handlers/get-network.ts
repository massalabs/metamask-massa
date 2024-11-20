import { getActiveNetwork } from '../active-chain';
import type { Handler } from './handler';
import type { NetworkInfos } from '../network';

export type GetNetworkResponse = NetworkInfos;

/**
 * @description Get the current network infos
 * @returns The network infos
 */
export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  return getActiveNetwork();
};
