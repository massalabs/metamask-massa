import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useNetwork = () => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.getNetwork', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'Provider.getNetwork',
      },
    }
  }));
}
