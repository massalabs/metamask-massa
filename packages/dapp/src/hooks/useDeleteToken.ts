import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type DeleteTokenParams = {
  accountAddress: string;
  address: string;
}

export type DeleteTokenResponse = {
  response: "OK" | "ERROR";
  message?: string;
}

export const useDeleteToken = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: DeleteTokenParams) => provider?.request<DeleteTokenResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.deleteToken",
        params
      }
    }
  }), [provider]);
}
