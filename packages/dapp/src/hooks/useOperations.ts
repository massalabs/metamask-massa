import { useContext } from 'react';
import type { Fetcher } from 'swr';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type OperationsResponse = {
  operations: string[];
};

/**
 * @description Hook that calls the metamask provider to get the operations ids of the active account
 * @param params - The get operations parameters (account address is optional, defaults to the active account)
 * @returns The operations ids of the active account (as a string array of operation ids)
 */
export const useOperations = (params?: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher: Fetcher<OperationsResponse, string> = async (
    method: string,
  ) => {
    const res = await provider?.request<OperationsResponse>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
          params,
        },
      },
    });
    return res as OperationsResponse;
  };

  return useSWR('account.getOperations', fetcher);
};

export const invalidateOperations = () => {
  mutate('account.getOperations');
};
