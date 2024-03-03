import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export const useAccountList = (params: { address: string }) => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.balance', () => provider?.request({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'account.balance',
        params
      },
    }
  }));
}
