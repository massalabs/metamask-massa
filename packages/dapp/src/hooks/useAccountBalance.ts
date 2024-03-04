import { useCallback, useContext, useEffect } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';
import { useNetwork } from './useNetwork';

export type AccountBalanceResponse = {
  finalBalance: string;
  candidateBalance: string;
};

export const useAccountBalance = (params: { address?: string }) => {
  const { provider } = useContext(MetaMaskContext);
  const { data: network } = useNetwork();
  const fetcher = useCallback(() => provider?.request({
      method:"wallet_invokeSnap",
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'account.balance',
          params
        },
      }
    }) as Promise<AccountBalanceResponse>
  , [provider, params])

  useEffect(() => {
    if (provider && params.address) {
      invalidateAccountBalance();
    }
  }, [provider, params.address, network]);

  return useSWR('account.balance', fetcher);
}

export const invalidateAccountBalance = () => {
  mutate('account.balance')
}
