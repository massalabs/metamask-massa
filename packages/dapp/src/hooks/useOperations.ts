import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';

export type OperationsResponse = Record<string, string[]>;

export const useOperations = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);

  return useSWR('account.getOperations', () => provider?.request<OperationsResponse>({
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
