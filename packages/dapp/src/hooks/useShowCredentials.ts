import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type ShowCredentialsParams = {
  address?: string;
};

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
