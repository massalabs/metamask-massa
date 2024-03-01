import { MetaMaskInpageProvider } from "@metamask/providers";
import { useCallback } from "react";
import { defaultSnapOrigin } from "../config";
import { ICallData } from "@massalabs/massa-web3";

export const useCallSmartContract = async (provider: MetaMaskInpageProvider) => {
    return useCallback(async (data: ICallData) => {
        return provider.request({
            method: 'wallet_invokeSnap',
            params: {
              snapId: defaultSnapOrigin,
              request: { method: 'callSmartContract', params: data }
            }
        });
    }, [provider]);
}
