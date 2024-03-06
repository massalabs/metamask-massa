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
