import { useContext, useEffect } from 'react';
import type { Fetcher } from 'swr';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';
import { invalidateOperations } from './useOperations';
import { invalidateTokens } from './useTokens';

import { defaultSnapOrigin } from '@/config';

export type ActiveAccountResponse = {
  name: string;
  address: string;
};

export const invalidateActiveAccount = () => {
  mutate('account.getActive');
};

/**
 * @description Hook that calls the metamask provider to get the active account
 * @returns The active account name and address
 */
export const useActiveAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  useEffect(() => {
    if (provider) {
      invalidateActiveAccount();
      invalidateOperations();
      invalidateTokens();
    }
  }, [provider]);

  const fetcher: Fetcher<ActiveAccountResponse, string> = async (
    method: string,
  ) => {
    const res = await provider?.request<ActiveAccountResponse>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
        },
      },
    });
    return res as ActiveAccountResponse;
  };
  return useSWR('account.getActive', fetcher);
};
