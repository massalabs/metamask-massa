import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type SignMessageParams = {
  data: number[];
};

export type SignMessageResponse = {
  signature: number[];
  publicKey: string;
};

/**
 * @description Hook that calls the metamask provider to sign a message
 * @param params - The sign message parameters (address to sign with and serialized data message as bytes)
 * @returns The signature and public key used to sign the message
 */
export const useSignMessage = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: SignMessageParams) =>
      provider?.request<SignMessageResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.sign',
            params,
          },
        },
      }),
    [provider],
  );
};
