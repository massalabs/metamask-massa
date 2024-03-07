import { useContext } from 'react';
import useSWR, { mutate } from 'swr';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';
import type { Account } from '@/types/account';

export type AccountList = Account[];

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
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mutate('account.list');
};
