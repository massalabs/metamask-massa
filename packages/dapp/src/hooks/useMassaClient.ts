import { CHAIN_ID, ClientFactory, DefaultProviderUrls, } from '@massalabs/massa-web3';
import { useNetwork } from './useNetwork';
import { useMemo } from 'react';



export const useMassaClient = () => {
  const {data: network} = useNetwork();

  return useMemo(async () => {
    if (!network) {
      return;
    }
    return ClientFactory.createDefaultClient(
      (BigInt(network?.network) === CHAIN_ID.MainNet ? DefaultProviderUrls.MAINNET : DefaultProviderUrls.BUILDNET),
      BigInt(network?.network!),
    );
  }, [network]);
}
