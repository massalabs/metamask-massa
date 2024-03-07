import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type SetNetworkParams = {
  network: string; // chainId
};

export type SetNetworkResponse = {
  network: string; // chainId
};

/**
 * @description Hook that calls the metamask provider to set the current network
 * @param params - The set network parameters (network id to set as a string)
 * @returns The response of the operation
 */
export const useSetNetwork = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: SetNetworkParams) =>
      provider?.request<SetNetworkResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'Provider.setNetwork',
            params,
          },
        },
      }),
    [provider],
  );
};
