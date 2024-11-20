import type { Client } from '@massalabs/massa-web3';
import { ClientFactory } from '@massalabs/massa-web3';
import { useCallback, useEffect, useState } from 'react';

import type { NetworkInfos } from './useNetwork';
import { useNetwork } from './useNetwork';

/**
 * @description Hook that creates a massa client from 'massa-web3' using the current network (updates when the network changes)
 * @returns The massa client
 */
export const useMassaClient = () => {
  const { data: network } = useNetwork();
  const [client, setClient] = useState<Client>();
  const createClient = useCallback(
    async (net: NetworkInfos) => {
      const newClient = await ClientFactory.createDefaultClient(
        net.rpcUrl as any,
        BigInt(net.chainId),
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
