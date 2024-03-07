import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type ShowCredentialsParams = {
  address?: string;
};
/**
 * @description Hook that calls the metamask provider to show the credentials of an account
 * Displayed as an alert dialog in metamask
 * @param params - The show credentials parameters (address is optional, defaults to the active account)
 * @returns The response of the operation
 */
export const useShowCredentials = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: ShowCredentialsParams) =>
      provider?.request<void>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.showCredentials',
            params,
          },
        },
      }),
    [provider],
  );
};
