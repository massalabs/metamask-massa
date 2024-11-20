import {
  CHAIN_ID,
  DefaultProviderUrls,
  fromMAS,
  MAINNET,
} from '@massalabs/massa-web3';
import { StateManager } from './state-manager';
import { NetworkInfos } from './network';

const NETWORK_INFO_KEY = 'network_info';

export const DEFAULT_MINIMAL_FEES = fromMAS('0.01').toString();
export const DEFAULT_NETWORK = {
  rpcUrl: DefaultProviderUrls.MAINNET,
  chainId: CHAIN_ID.MainNet.toString(),
  minimalFees: DEFAULT_MINIMAL_FEES,
  networkName: MAINNET,
};
/**
 * @description Get the current network
 * @returns NetworkInfos
 */
export async function getActiveNetwork(): Promise<NetworkInfos> {
  const infos = await StateManager.getState(NETWORK_INFO_KEY);

  if (!infos) {
    await setActiveNetwork(DEFAULT_NETWORK);
    return DEFAULT_NETWORK;
  }
  return infos;
}

/**
 * @description Set the current network
 * @param infos - Network infos
 */
export async function setActiveNetwork(infos: NetworkInfos) {
  await StateManager.setState(NETWORK_INFO_KEY, infos);
}
