import { MetaMaskInpageProvider } from "@metamask/providers";
import { useCallback } from "react";
import { defaultSnapOrigin } from "../config";
import { ICallData } from "@massalabs/massa-web3";

export type CallSCParameters = {
  nickname: string;
  fee: bigint;
  functionName: string;
  at: string;
  args: Array<number>;
  coins: string;
  nonPersistentExecution?: {
    isNPE: boolean;
    maxGas: string;
  }
}

export const useCallSmartContract = async (provider: MetaMaskInpageProvider) => {
    return useCallback(async (data: CallSCParameters) => {
        return provider.request({
            method: 'wallet_invokeSnap',
            params: {
              snapId: defaultSnapOrigin,
              request: { method: 'callSmartContract', params: data }
            }
        });
    }, [provider]);
}
