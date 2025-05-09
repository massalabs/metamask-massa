import { getProvider } from '../accounts/provider';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';
import { ExecuteScParams } from '@massalabs/massa-web3';
import { getActiveNetwork } from '../active-chain';
import type { CallSCResponse } from './call-smart-contract';
import { ExecuteSc } from '../components/ExecuteSc';

export type ExecuteSCParameters = {
  bytecode: number[];
  datastore?: {
    key: number[];
    value: number[];
  }[];
  fee?: string;
  maxCoins?: string;
  maxGas?: string;
};

export type ExecuteSCResponse = CallSCResponse;

const validate = (params: ExecuteSCParameters) => {
  // mandatory parameters
  if (!params.bytecode || !Array.isArray(params.bytecode)) {
    throw new Error('Invalid params: bytecode must be an array');
  }

  // optionnal parameters
  if (
    params.datastore &&
    (!Array.isArray(params.datastore) ||
      !params.datastore!.every(
        (pair) => Array.isArray(pair.key) && Array.isArray(pair.value),
      ))
  ) {
    throw new Error(
      'Invalid params: datastore must be an array of key-value pairs',
    );
  }

  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
  if (params?.maxGas && typeof params.maxGas !== 'string') {
    throw new Error('Invalid params: maxGas must be a string');
  }
  if (params?.maxCoins && typeof params.maxCoins !== 'string') {
    throw new Error('Invalid params: maxCoins must be a string');
  }
};
/**
 * @description Execute a smart contract bytecode
 * @param params - ExecuteSCParameters
 * @returns The operation id
 * @throws If the user denies the operation
 */
export const executeSC: Handler<
  ExecuteSCParameters,
  ExecuteSCResponse
> = async (params) => {
  validate(params);
  const provider = await getProvider();

  const networkInfos = await getActiveNetwork();
  const fee = params.fee ?? networkInfos.minimalFees;

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: <ExecuteSc fee={fee} maxCoins={params.maxCoins ?? 'none'} />,
    },
  });

  if (!confirm) {
    throw new Error('User denied executing smart contract');
  }
  const executeSCParams: ExecuteScParams = {
    byteCode: Uint8Array.from(params.bytecode),
    fee: BigInt(fee),
  };

  if (params.datastore) {
    executeSCParams.datastore = new Map(
      params.datastore.map((pair) => [
        Uint8Array.from(pair.key),
        Uint8Array.from(pair.value),
      ]),
    );
  }

  if (params.maxGas) {
    executeSCParams.maxGas = BigInt(params.maxGas);
  }
  if (params.maxCoins) {
    executeSCParams.maxCoins = BigInt(params.maxCoins);
  }

  const operation = await provider.executeSC(executeSCParams);
  await addAccountOperation(provider.address, operation.id);
  return {
    operationId: operation.id,
  };
};
