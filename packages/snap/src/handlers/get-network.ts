import { CHAIN_ID } from '@massalabs/massa-web3';

import { getActiveChainId } from '../active-chain';
import type { Handler } from './handler';

export type GetNetworkResponse = {
  network: string; // chainId
};

export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  const chainId = await getActiveChainId();
  return {
    network: chainId.toString(),
  };
};
