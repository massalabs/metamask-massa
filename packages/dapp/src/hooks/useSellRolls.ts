import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type SellRollsParams = {
  fee: string;
  amount: string;
};

export type SellRollsResponse = {
  operationId: string;
};

/**
 * @description Hook that calls the metamask provider to sell rolls
 * @param params - The sell rolls parameters (amount and fee)
 * @returns The operation id of the sell rolls operation
 */
export const useSellRolls = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: SellRollsParams) =>
      provider?.request<SellRollsResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.sellRolls',
            params,
          },
        },
      }),
    [provider],
  );
};
