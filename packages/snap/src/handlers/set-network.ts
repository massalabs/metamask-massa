import { setActiveChainId } from '../active-chain';
import type { Handler } from './handler';

export type SetNetworkParams = {
  network: string;
};

export type SetNetworkResponse = {
  network: string; // chainId
};

const coerceParams = (params: SetNetworkParams): bigint => {
  if (!params.network || typeof params.network !== 'string') {
    throw new Error('Invalid params: network must be a string');
  }
  return BigInt(params.network);
};

export const setNetwork: Handler<SetNetworkParams, SetNetworkResponse> = async (
  params,
) => {
  const network = coerceParams(params);

  await setActiveChainId(network);
  return { network: network.toString() };
};
