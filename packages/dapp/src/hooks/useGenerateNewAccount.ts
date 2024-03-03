import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type GenerateAccountParams = {
  name: string;
};

export type GenerateAccountResponse = {
  name: string;
  address: string;
};

export const useGenerateNewAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: GenerateAccountParams) => provider?.request<GenerateAccountResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.generateNewAccount",
        params
      }
    }
  }), [provider]);
}
