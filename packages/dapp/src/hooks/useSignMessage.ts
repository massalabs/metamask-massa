import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type SignMessageParams = {
  address: string;
  data: number[];
};

export type SignMessageResponse = {
  signature: number[];
  publicKey: string;
};

export const useSignMessage = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: SignMessageParams) => provider?.request<SignMessageResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.sign",
        params
      }
    }
  }), [provider]);
}
