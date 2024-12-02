import { useCallback, useEffect, useState } from 'react';

import { useMassaClient } from './useMassaClient';
import { rpcTypes } from '@massalabs/massa-web3';

/**
 * @description Hook that calls the massa client to get the operations data
 * @param operationIds - The operation ids to get the data from
 * @returns The operations data (@see `IOperationData` for more information)
 */
export const useOperationsData = (operationIds: string[]) => {
  const [operationsData, setOperationsData] = useState<
    rpcTypes.OperationInfo[]
  >([]);
  const client = useMassaClient();

  const setOperationsInfos = useCallback(async () => {
    if (!client) {
      return;
    }
    try {
      const res = await client.getOperations(operationIds);
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
