/*
  Parameter specified by massa standard with an additionnal fee field
*/
export type CallSCParameters = {
  nickname: string;
  fee: bigint;
  functionName: string;
  at: string;
  args: Array<number>;
  coins: string;
  nonPersistentExecution?: {
    isNPE: boolean;
    maxGas: string;
  }
}

export type CallSCResponse = {
  operationId: string;
}
