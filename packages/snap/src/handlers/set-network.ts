import {
  fromMAS,
  IClientConfig,
  ProviderType,
  PublicApiClient,
} from '@massalabs/massa-web3';
import {
  setActiveChainId,
  setActiveMinimalFees,
  setActiveRPC,
} from '../active-chain';
import type { Handler } from './handler';

export type SetNetworkParams = {
  network: string;
};

export type SetNetworkResponse = {
  network: string; // url
};

export const DEFAULT_MINIMAL_FEES = fromMAS('0.01').toString();

/**
 * @description Coerce the network parameter
 * @param params - The network parameters
 * @returns The network url as a bigint
 */
const coerceParams = (params: SetNetworkParams): string => {
  if (!params.network || typeof params.network !== 'string') {
    throw new Error('Invalid params: network must be a string');
  }

  return params.network;
};

/**
 * @description Set the current network using a rpc url
 * @param params - The network parameters
 * @returns The network rpc url
 */
export const setNetwork: Handler<SetNetworkParams, SetNetworkResponse> = async (
  params,
) => {
  const network = coerceParams(params);

  const config: IClientConfig = {
    providers: [{ url: network, type: ProviderType.PUBLIC }],
  };

  const publicApi = new PublicApiClient(config);
  const node_status = await publicApi.getNodeStatus();

  await setActiveRPC(network);
  await setActiveChainId(node_status.chain_id);
  await setActiveMinimalFees(node_status.minimal_fees || DEFAULT_MINIMAL_FEES);

  return { network: network };
};
