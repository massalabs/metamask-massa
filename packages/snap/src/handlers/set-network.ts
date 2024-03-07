import { setActiveChainId } from '../active-chain';
import type { Handler } from './handler';

export type SetNetworkParams = {
  network: string;
};

export type SetNetworkResponse = {
  network: string; // chainId
};

/**
 * @description Coerce the network parameter by converting it to a bigint
 * @param params - The network parameters
 * @returns The network chain id as a bigint
 */
const coerceParams = (params: SetNetworkParams): bigint => {
  if (!params.network || typeof params.network !== 'string') {
    throw new Error('Invalid params: network must be a string');
  }
  return BigInt(params.network);
};

/**
 * @description Set the current network using a chain id
 * @param params - The network parameters
 * @returns The network chain id
 */
export const setNetwork: Handler<SetNetworkParams, SetNetworkResponse> = async (
  params,
) => {
  const network = coerceParams(params);

  await setActiveChainId(network);
  return { network: network.toString() };
};
