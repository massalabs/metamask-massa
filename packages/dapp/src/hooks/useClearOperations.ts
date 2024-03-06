import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type ClearOperationsParams = {
  address?: string;
};

export type ClearOperationsResponse = {
  response: 'OK' | 'ERROR' | 'REFUSED';
  message?: string;
};

export const useClearOperations = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: ClearOperationsParams) =>
      provider?.request<ClearOperationsResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.clearOperations',
            params,
          },
        },
      }),
    [provider],
  );
};
