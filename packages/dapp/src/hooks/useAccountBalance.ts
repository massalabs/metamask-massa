import { useCallback, useContext, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';
import { useNetwork } from './useNetwork';

import { defaultSnapOrigin } from '@/config';

export type AccountBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

export const invalidateAccountBalance = () => {
  mutate('account.balance');
};

export const useAccountBalance = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const { data: network } = useNetwork();
  const fetcher = useCallback(
    async () =>
      provider?.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.balance',
            params,
          },
        },
      }) as Promise<AccountBalanceResponse>,
    [provider, params],
  );

  useEffect(() => {
    if (provider && params.address) {
      invalidateAccountBalance();
    }
  }, [provider, params.address, network]);

  return useSWR('account.balance', fetcher);
};
