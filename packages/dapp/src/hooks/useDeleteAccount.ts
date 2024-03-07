import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type DeleteAccountParams = {
  publicKey: string;
  privateKey: string;
};

/**
 * @description Hook that calls the metamask provider to delete an account
 * @param params - The delete account parameters (publicKey and privateKey)
 * @returns The response of the operation
 */
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
