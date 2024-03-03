import { useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR from 'swr';
import { defaultSnapOrigin } from '@/config';
import { Account } from '@/types/account';

export type AccountList = Account[]

export const useAccountList = () => {
  const { provider } = useContext(MetaMaskContext);
  return useSWR('account.list', () => provider?.request<AccountList>({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
          request: {
            method: 'account.list',
          },
    }
  }));
}
