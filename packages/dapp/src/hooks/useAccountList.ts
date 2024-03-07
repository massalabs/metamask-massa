import { useContext } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';
import type { Account } from '@/types/account';

export type AccountList = Account[];

/**
 * @description Hook that calls the metamask provider to get the account list
 * @returns The account list imported in the wallet
 */
export const useAccountList = () => {
  const { provider } = useContext(MetaMaskContext);
  return useSWR('account.list', async () =>
    provider?.request<AccountList>({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'account.list',
        },
      },
    }),
  );
};

export const invalidateAccountList = () => {
  mutate('account.list');
};
