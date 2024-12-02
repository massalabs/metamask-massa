import { setActiveNetwork } from '../active-chain';
import type { Handler } from './handler';
import { SwitchNetwork } from '../components/SwitchNetwork';
import { fetchNetworkInfosFromUrl } from '../network';

export type SetNetworkParams = {
  network: string;
};

export type SetNetworkResponse = {
  network: string; // url
};

const validate = (params: SetNetworkParams) => {
  if (!params.network || typeof params.network !== 'string') {
    throw new Error('Invalid params: network must be a string');
  }
};

/**
 * @description Set the current network using a rpc url
 * @param params - The network parameters
 * @returns The network rpc url
 */
export const setNetwork: Handler<SetNetworkParams, SetNetworkResponse> = async (
  params,
) => {
  validate(params);

  const networkInfos = await fetchNetworkInfosFromUrl(params.network);

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

  return { network: params.network };
};
