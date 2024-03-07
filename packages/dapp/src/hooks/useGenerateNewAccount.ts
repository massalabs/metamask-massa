import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type GenerateAccountParams = {
  name: string;
};

export type GenerateAccountResponse = {
  name: string;
  address: string;
};

/**
 * @description Hook that calls the metamask provider to generate a new account
 * @returns The name and address of the new account
 */
export const useGenerateNewAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: GenerateAccountParams) =>
      provider?.request<GenerateAccountResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.generateNewAccount',
            params,
          },
        },
      }),
    [provider],
  );
};
