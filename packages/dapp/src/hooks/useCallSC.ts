import { useCallback, useContext } from 'react';

import { MetaMaskContext } from './MetamaskContext';

import { defaultSnapOrigin } from '@/config';

export type CallSCParams = {
  nickname: string;
  fee: string;
  functionName: string;
  at: string;
  args: number[];
  coins: string;
  nonPersistentExecution?: {
    isNPE: boolean;
    maxGas: string;
  };
};

export type CallSCResponse = {
  operationId: string;
};

/**
 * @description Hook that calls the metamask provider to call a smart contract
 * @param params - The call smart contract parameters (see massa standard)
 * @returns The response of the operation
 */
export const useCallSC = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback(
    async (params: CallSCParams) =>
      provider?.request<CallSCResponse>({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'account.callSC',
            params,
          },
        },
      }),
    [provider],
  );
};
