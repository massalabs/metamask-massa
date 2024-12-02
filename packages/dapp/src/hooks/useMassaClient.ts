import { useCallback, useEffect, useState } from 'react';

import type { NetworkInfos } from './useNetwork';
import { useNetwork } from './useNetwork';
import { JsonRPCClient } from '@massalabs/massa-web3';

/**
 * @description Hook that creates a massa client from 'massa-web3' using the current network (updates when the network changes)
 * @returns The massa client
 */
export const useMassaClient = () => {
  const { data: network } = useNetwork();
  const [client, setClient] = useState<JsonRPCClient>();
  const createClient = useCallback(
    async (net: NetworkInfos) => {
      setClient(new JsonRPCClient(net.rpcUrl));
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
