import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type TransferParams = {
  recipientAddress: string;
  amount: string;
  fee: string;
};

export type TransferResponse = {
  operationId: string;
};

export const useTransfer = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: TransferParams) =>
      provider?.request<TransferResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.sendTransaction',
            params,
          },
        },
      }),
    [provider],
  );
};
