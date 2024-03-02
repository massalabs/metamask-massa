/* eslint-disable @typescript-eslint/array-type */
import type { MetaMaskInpageProvider } from '@metamask/providers';
import { useCallback } from 'react';

import { defaultSnapOrigin } from '../config';

export type CallSCParameters = {
  nickname: string;
  fee: string;
  functionName: string;
  at: string;
  args: Array<number>;
  coins: string;
  nonPersistentExecution?: {
    isNPE: boolean;
    maxGas: string;
  };
};

export const useCallSmartContract = (provider: MetaMaskInpageProvider) => {
  return useCallback(
    async (data: CallSCParameters) => {
      return provider.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: { method: 'callSmartContract', params: data },
        },
      });
    },
    [provider],
  );
};
