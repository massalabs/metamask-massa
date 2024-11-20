import { setActiveNetwork } from '../active-chain';
import type { Handler } from './handler';
import { SwitchNetwork } from '../components/SwitchNetwork';
import { fetchNetworkInfos } from '../network';

export type SetNetworkParams = {
  network: string;
};

export type SetNetworkResponse = {
  network: string; // url
};

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

  const networkInfos = await fetchNetworkInfos(network);

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: <SwitchNetwork {...networkInfos} />,
    },
  });

  if (!confirm) {
    throw new Error('User denied calling network change');
  }

  await setActiveNetwork(networkInfos);

  return { network };
};
