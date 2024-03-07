import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type SetActiveAccountParams = {
  address: string;
};

export type SetActiveAccountResponse = {
  name: string;
  address: string;
};
/**
 * @description Hook that calls the metamask provider to set the active account
 * @param params - The set active account parameters (string address to set as the active account)
 * @returns The response of the operation
 */
export const useSetActiveAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: SetActiveAccountParams) =>
      provider?.request<SetActiveAccountResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.setActive',
            params,
          },
        },
      }),
    [provider],
  );
};
