import { useContext, useEffect } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { Fetcher, mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';
import { Account } from '@/types/account';
import { invalidateOperations } from './useOperations';
import { invalidateTokens } from './useTokens';

export type ActiveAccountResponse = {
  name: string;
  address: string;
};


export const useActiveAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  useEffect(() => {
    if (provider) {
    invalidateActiveAccount();
    invalidateOperations();
    invalidateTokens();
    }
  }, [provider]);

  const fetcher: Fetcher<ActiveAccountResponse, string> = async (method: string) => {
    const res = await provider?.request<ActiveAccountResponse>({
      method:"wallet_invokeSnap",
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
        },
      }
    });
    return res as ActiveAccountResponse;
  }
  return useSWR('account.getActive', fetcher);
}

export const invalidateActiveAccount = () => {
  mutate('account.getActive')
}
