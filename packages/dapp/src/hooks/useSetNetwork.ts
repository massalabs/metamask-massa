import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type SetNetworkParams = {
  network: string; // chainId
};

export type SetNetworkResponse = {
  network: string; // chainId
};
export const useSetNetwork = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: SetNetworkParams) => provider?.request<SetNetworkResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"Provider.setNetwork",
        params
      }
    }
  }), [provider]);
}
