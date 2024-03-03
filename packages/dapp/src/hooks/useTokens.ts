import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';
import { AccountToken } from '@/types/account-token';

export type TokensResponse = {
  tokens: AccountToken[];
}

export const useTokens = (params?: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher = async (method: string) => {
    const res = await provider?.request<AccountToken>({
      method:"wallet_invokeSnap",
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
          params
        },
      }
    });
    return res as TokensResponse;
  }

  return useSWR('account.getTokens', fetcher);
}
