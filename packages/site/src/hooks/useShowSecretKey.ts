import { MetaMaskInpageProvider } from "@metamask/providers";
import { useCallback } from "react"
import { defaultSnapOrigin } from "../config";

export const useShowSecretKey = (provider: MetaMaskInpageProvider) => {
  return useCallback(async () => {
    return provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: { method: 'showSecretKey' }
      },
    });
  }, [provider]);

}
