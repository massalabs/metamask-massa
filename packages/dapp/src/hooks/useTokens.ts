import { useContext } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';
import type { AccountToken } from '@/types/account-token';

export type TokensResponse = {
  tokens: string[];
};

/**
 * @description Hook that calls the metamask provider to get the tokens of the active account
 * @param params - The get tokens parameters (account address is optional, defaults to the active account)
 * @returns The tokens of the active account (as a string array of token addresses)
 * @throws If the account is not found
 */
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
  mutate('account.getTokens');
};
