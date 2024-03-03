import { useContext, useEffect } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import useSWR, { mutate } from 'swr';
import { defaultSnapOrigin } from '@/config';
import { Account } from '@/types/account';

export const useActiveAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  useEffect(() => {
    if (provider) {
    invalidateActiveAccount();
    }
  }, [provider]);

  return useSWR('account.getActive', () => provider?.request<Account>({
    method:"wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'account.getActive',
      },
    }
  }));
}
export const invalidateActiveAccount = () => {
  mutate('account.getActive')
}
