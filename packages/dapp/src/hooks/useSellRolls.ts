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
