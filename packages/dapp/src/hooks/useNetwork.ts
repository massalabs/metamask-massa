import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useNetwork = () => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('Provider.getNetwork', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'Provider.getNetwork',
      },
    }
  }));
}

export const invalidateNetwork = () => {
  mutate('Provider.getNetwork');
}
