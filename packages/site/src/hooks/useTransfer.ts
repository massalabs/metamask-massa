import { MetaMaskInpageProvider } from "@metamask/providers";
import { useCallback } from "react";
import { defaultSnapOrigin } from "../config";
import { ITransactionData } from "@massalabs/massa-web3";

export const useTransfer = (provider: MetaMaskInpageProvider) => {
    return useCallback(async (params: ITransactionData) => {
        const ret = await provider.request({
            method: 'wallet_invokeSnap',
            params: {
              snapId: defaultSnapOrigin,
              request: {
                method: 'transfer',
                params: {
                  recipientAddress: params.recipientAddress,
                  amount: params.amount.toString(),
                  fee: params.fee.toString(),
                }
              }
            }
        });
        console.log(ret);
        return ret;
    }, [provider]);
}
