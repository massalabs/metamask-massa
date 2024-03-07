import { useContext } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';
import type { AccountToken } from '@/types/account-token';

export type TokensResponse = {
  tokens: string[];
};

export const useTokens = (params?: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const fetcher = async (method: string) => {
    const res = await provider?.request<AccountToken>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method,
          params,
        },
      },
    });
    return res as TokensResponse;
  };

  return useSWR('account.getTokens', fetcher);
};

export const invalidateTokens = () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mutate('account.getTokens');
};
