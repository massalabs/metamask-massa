import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type TransferParams = {
  recipientAddress: string;
  amount: string;
  fee?: string;
};

export type TransferResponse = {
  operationId: string;
};
/**
 * @description Hook that calls the metamask provider to transfer funds
 * @param params - The transfer parameters (recipient address, amount, and fee)
 * @returns The operation id of the transfer operation
 * @throws If the user denies the transaction
 */
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
