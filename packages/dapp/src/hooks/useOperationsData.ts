import type { IOperationData } from '@massalabs/massa-web3';
import { useCallback, useEffect, useState } from 'react';

import { useMassaClient } from './useMassaClient';

export const useOperationsData = (operationIds: string[]) => {
  const [operationsData, setOperationsData] = useState<IOperationData[]>([]);
  const client = useMassaClient();

  const setOperationsInfos = useCallback(async () => {
    if (!client) {
      return;
    }
    try {
      const res = await client.publicApi().getOperations(operationIds);
      setOperationsData(res);
    } catch (error) {
      console.error(error);
      setOperationsData([]);
    }
  }, [client, operationIds]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setOperationsInfos();
  }, [operationIds, client, setOperationsInfos]);

  return {
    data: operationsData,
    reset: async () => setOperationsInfos(),
  };
};
