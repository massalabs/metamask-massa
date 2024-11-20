import { useContext, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type NetworkInfos = {
  rpcUrl: string;
  chainId: string;
  minimalFees: string;
  networkName: string;
};

/**
 * @description Hook that calls the metamask provider to get the current network
 * @returns The current network (as a string chainId from a bigint)
 */
export const useNetwork = () => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher = async () => {
    const res = await provider?.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'Provider.getNetwork',
        },
      },
    });
    return res as NetworkInfos;
  };

  useEffect(() => {
    mutate('Provider.getNetwork');
  }, [provider]);

  return useSWR('Provider.getNetwork', fetcher);
};

export const invalidateNetwork = () => {
  mutate('Provider.getNetwork');
};
