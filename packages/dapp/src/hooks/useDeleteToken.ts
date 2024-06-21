import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type DeleteTokenParams = {
  address: string;
};

export type DeleteTokenResponse = {
  response: 'OK' | 'ERROR';
  message?: string;
};

/**
 * @description Hook that calls the metamask provider to delete a token
 * @param params - The delete token parameters (accountAddress and address)
 * @returns The response of the operation
 */
export const useDeleteToken = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: DeleteTokenParams) =>
      provider?.request<DeleteTokenResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.deleteToken',
            params,
          },
        },
      }),
    [provider],
  );
};
