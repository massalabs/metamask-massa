import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type AccountToken = { name: string, address: string, decimals: number };

export type AddTokenParams = AccountToken & {
  accountAddress?: string;
};

export type AddTokenResponse = AccountToken;

export const useAddToken = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: AddTokenParams) => provider?.request<AddTokenResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.addToken",
        params
      }
    }
  }), [provider]);
}
