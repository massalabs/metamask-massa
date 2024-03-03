import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';

export type NetworkResponse = {
  network: string; // chainId
}

export const useNetwork = () => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher = async () => {
    const res = await provider?.request({
      method:"wallet_invokeSnap",
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'Provider.getNetwork',
        },
      }
    });
    return res as NetworkResponse;
  }

  return useSWR('Provider.getNetwork', fetcher);
}

export const invalidateNetwork = () => {
  mutate('Provider.getNetwork');
}
