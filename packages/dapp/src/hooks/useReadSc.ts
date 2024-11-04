import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type ReadSCParameters = {
  fee?: string;
  functionName: string;
  at: string;
  args: number[];
  coins?: string;
  maxGas?: string;
  caller?: string;
};

export type ReadSCResponse = {
  data: number[];
  infos: {
    gasCost: number;
  };
};

/**
 * @description Hook that calls the metamask provider to call a smart contract
 * @param params - The call smart contract parameters (see massa standard)
 * @returns The response of the operation
 */
export const useReadSC = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: ReadSCParameters) =>
      provider?.request<ReadSCResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.readSC',
            params,
          },
        },
      }),
    [provider],
  );
};
