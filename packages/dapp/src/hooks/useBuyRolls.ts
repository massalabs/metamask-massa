import { useCallback, useContext } from 'react';
import { MetaMaskContext } from './MetamaskContext';
import { defaultSnapOrigin } from '@/config';

export type BuyRollsParams = {
  fee: string;
  amount: string;
};

export type BuyRollsResponse = {
  operationId: string;
};

export const useBuyRolls = () => {
  const { provider } = useContext(MetaMaskContext);

  return useCallback((params: BuyRollsParams) => provider?.request<BuyRollsResponse>({
    method: "wallet_invokeSnap",
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method:"account.buyRolls",
        params
      }
    }
  }), [provider]);
}
