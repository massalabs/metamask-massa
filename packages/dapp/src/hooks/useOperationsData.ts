import type { IOperationData } from '@massalabs/massa-web3';
import { useCallback, useEffect, useState } from 'react';

import { useMassaClient } from './useMassaClient';

/**
 * @description Hook that calls the massa client to get the operations data
 * @param operationIds - The operation ids to get the data from
 * @returns The operations data (@see `IOperationData` for more information)
 */
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
    setOperationsInfos();
  }, [operationIds, client, setOperationsInfos]);

  return {
    data: operationsData,
    reset: async () => setOperationsInfos(),
  };
};
