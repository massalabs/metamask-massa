import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useActiveAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.getActive', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'account.getActive',
      },
    }
  }));
}
