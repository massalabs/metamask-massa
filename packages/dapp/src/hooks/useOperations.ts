import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useOperations = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.getOperations', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'account.getOperations',
        params
      },
    }
  }));
}
