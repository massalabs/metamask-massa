import { MetaMaskInpageProvider } from "@metamask/providers";
import { useCallback } from "react";
import { defaultSnapOrigin } from "../config";

export type SignMessageParams = {
  data: string | Buffer,
  chainId: bigint
}

export const useSignMessage = (provider: MetaMaskInpageProvider) => {
  return useCallback(async (params: SignMessageParams) => {
    console.log('useSignMessage', params);
    return provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'signMessage',
          params: {
            data: params.data.toString(),
            chainId: params.chainId.toString()
          }
        }
      },
    });
  }, [provider]);
}
