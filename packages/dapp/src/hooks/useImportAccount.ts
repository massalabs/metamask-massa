import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type ImportAccountParams = {
  publicKey: string;
  privateKey: string;
};

/**
 * @description Hook that calls the metamask provider to import an account
 * @param params - The import account parameters (publicKey and privateKey)
 * @returns The response of the operation
 */
export const useImportAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: ImportAccountParams) =>
      provider?.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.import',
            params,
          },
        },
      }),
    [provider],
  );
};
