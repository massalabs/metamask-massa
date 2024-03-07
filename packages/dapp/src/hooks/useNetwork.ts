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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    mutate('Provider.getNetwork');
  }, [provider]);

  return useSWR('Provider.getNetwork', fetcher);
};

export const invalidateNetwork = () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mutate('Provider.getNetwork');
};
