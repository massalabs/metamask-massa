import { useContext } from 'react';
import useSWR from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

/**
 * @description Hook that calls the metamask provider to get the node urls for the current active network
 * @returns The node urls for the current active network
 */
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
