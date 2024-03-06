import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type DeleteAccountParams = {
  publicKey: string;
  privateKey: string;
};

export const useDeleteAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: DeleteAccountParams) =>
      provider?.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.delete',
            params,
          },
        },
      }),
    [provider],
  );
};
