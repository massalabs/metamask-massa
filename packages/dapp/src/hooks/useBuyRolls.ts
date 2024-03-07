import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type BuyRollsParams = {
  fee: string;
  amount: string;
};

export type BuyRollsResponse = {
  operationId: string;
};

/**
 * @description Hook that calls the metamask provider to buy rolls
 * @param params - The buy rolls parameters (fee and amount)
 * @returns The operationId of the operation
 */
export const useBuyRolls = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: BuyRollsParams) =>
      provider?.request<BuyRollsResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.buyRolls',
            params,
          },
        },
      }),
    [provider],
  );
};
