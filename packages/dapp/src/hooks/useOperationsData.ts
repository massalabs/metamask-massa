import { IOperationData } from "@massalabs/massa-web3"
import { useEffect, useState } from "react";
import { useMassaClient } from "./useMassaClient";

export const useOperationsData  = (operationIds: string[]) => {
  const [operationsData, setOperationsData] = useState<IOperationData[]>([]);
  const client = useMassaClient();

  const setOperationsInfos = async () => {
    if (!client) {
      return;
    }
    try {
      const res = await client.publicApi().getOperations(operationIds);
      setOperationsData(res!);
    }
    catch (e) {
      console.error(e);
      setOperationsData([]);
    }
  }

  useEffect( () => {
    setOperationsInfos();
  }, [operationIds, client]);

  return operationsData;

}
