import type { Client } from '@massalabs/massa-web3';
import {
  CHAIN_ID,
  ClientFactory,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';
import { useCallback, useEffect, useState } from 'react';

import type { NetworkResponse } from './useNetwork';
import { useNetwork } from './useNetwork';

/**
 * @description Hook that creates a massa client from 'massa-web3' using the current network (updates when the network changes)
 * @returns The massa client
 */
export const useMassaClient = () => {
  const { data: network } = useNetwork();
  const [client, setClient] = useState<Client>();
  const createClient = useCallback(
    async (net: NetworkResponse) => {
      const newClient = await ClientFactory.createDefaultClient(
        net?.network === DefaultProviderUrls.MAINNET
          ? DefaultProviderUrls.MAINNET
          : DefaultProviderUrls.BUILDNET,
        net?.network === DefaultProviderUrls.MAINNET
          ? CHAIN_ID.MainNet
          : CHAIN_ID.BuildNet,
      );
      setClient(newClient);
    },
    [setClient],
  );

  useEffect(() => {
    if (network) {
      createClient(network);
    }
  }, [createClient, network]);

  return client;
};
