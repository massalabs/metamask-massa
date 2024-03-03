import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useTokens = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.getTokens', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'account.getTokens',
        params
      },
    }
  }));
}
