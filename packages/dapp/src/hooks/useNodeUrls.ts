import { useContext } from 'react';
import useSWR from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export const useNodeUrls = () => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('Provider.getNodeUrls', async () =>
    provider?.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'Provider.getNodeUrls',
        },
      },
    }),
  );
};
