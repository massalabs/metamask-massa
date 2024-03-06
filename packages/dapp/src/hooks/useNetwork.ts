import { useContext, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type NetworkResponse = {
  network: string; // chainId
};

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
    return res as NetworkResponse;
  };

  useEffect(() => {
    mutate('Provider.getNetwork');
  }, [provider]);

  return useSWR('Provider.getNetwork', fetcher);
};

export const invalidateNetwork = () => {
  mutate('Provider.getNetwork');
};
