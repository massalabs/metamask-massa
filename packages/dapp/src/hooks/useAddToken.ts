import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';
import type { AccountToken } from '@/types/account-token';

export type AddTokenParams = {
  address: string;
  accountAddress?: string;
};

export type AddTokenResponse = AccountToken;

/**
 * @description Hook that calls the metamask provider to add a token
 * @param params - The add token parameters (address of the token and accountAddress which is optional and defaults to the current active account)
 * @returns The response of the operation
 */
export const useAddToken = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: AddTokenParams) =>
      provider?.request<AddTokenResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.addToken',
            params,
          },
        },
      }),
    [provider],
  );
};
