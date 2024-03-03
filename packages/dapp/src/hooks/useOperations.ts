import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { Fetcher, mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';

export type OperationsResponse = {
  operations: string[];
}

export const useOperations = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher: Fetcher<OperationsResponse, string> = async (method: string) => {
    const res = await provider?.request<OperationsResponse>({
      method:"wallet_invokeSnap",
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
          params
        },
      }
    });
    return res as OperationsResponse;
  }

  return useSWR('account.getOperations', fetcher);
}

export const invalidateOperations = () => {
  mutate('account.getOperations');
}
