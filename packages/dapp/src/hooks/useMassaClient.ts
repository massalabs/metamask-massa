import type { Client } from '@massalabs/massa-web3';
import {
  CHAIN_ID,
  ClientFactory,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { NetworkResponse } from './useNetwork';
import { useNetwork } from './useNetwork';

export const useMassaClient = () => {
  const { data: network } = useNetwork();
  const [client, setClient] = useState<Client>();
  const createClient = useCallback(
    async (network: NetworkResponse) => {
      const newClient = await ClientFactory.createDefaultClient(
        BigInt(network?.network) === CHAIN_ID.MainNet
          ? DefaultProviderUrls.MAINNET
          : DefaultProviderUrls.BUILDNET,
        BigInt(network?.network),
      );
      setClient(newClient);
    },
    [setClient],
  );

  useEffect(() => {
    if (network) {
      createClient(network);
    }
  }, [network]);

  return client;
};
