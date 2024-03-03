import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type ImportAccountParams = {
  publicKey: string;
  privateKey: string
}

export const useImportAccount = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: ImportAccountParams) => provider?.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.import",
        params
      }
    }
  }), [provider]);
}
