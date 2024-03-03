import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useNodeUrls = () => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('Provider.getNodeUrls', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'Provider.getNodeUrls',
      },
    }
  }));
}
