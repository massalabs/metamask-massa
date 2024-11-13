import type { ICallData } from '@massalabs/massa-web3';
import { CallSc } from '../components/CallSc';

import { getClient } from '../accounts/clients';
import { getHDAccount } from '../accounts/hd-deriver';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';

export type CallSCParameters = {
  fee: string;
  functionName: string;
  at: string;
  args: number[];
  coins: string;
  maxGas?: string;
};

export type CallSCResponse = {
  operationId: string;
};

/**
 * Coerce the call smart contract parameters by ensuring the parameters are present and are the correct type
 * @param params - The call smart contract parameters
 * @returns The call smart contract parameters
 * @throws If the nickname, fee, functionName, at, args, or coins is missing or not a string
 */
const coerceParams = (params: CallSCParameters): ICallData => {
  // mandatory parameters
  if (!params.fee || typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  } else if (!params.functionName || typeof params.functionName !== 'string') {
    throw new Error('Invalid params: functionName must be a string');
  } else if (!params.at || typeof params.at !== 'string') {
    throw new Error('Invalid params: at must be a string');
  } else if (!params.args || !Array.isArray(params.args)) {
    throw new Error('Invalid params: args must be an array');
    // optionnal parameters
  } else if (params?.coins && typeof params.coins !== 'string') {
    throw new Error('Invalid params: coins must be a string');
  } else if (params?.maxGas && typeof params.maxGas !== 'string') {
    throw new Error('Invalid params: maxGas must be a string');
  }
  const req = {
    fee: BigInt(params.fee),
    targetAddress: params.at,
    targetFunction: params.functionName,
    parameter: params.args,
  } as ICallData;
  if (params.maxGas) {
    req.maxGas = BigInt(params.maxGas);
  }
  if (params.coins) {
    req.coins = BigInt(params.coins);
  }
  return req;
};
/**
 * @description Calls a smart contract with the given parameters
 * @param params - The call smart contract parameters (see `CallSCParameters` type and massa standard)
 * @returns The operation id
 * @throws If the user denies the transaction
 * @throws If the client or account is not found
 */
export const callSmartContract: Handler<
  CallSCParameters,
  CallSCResponse
> = async (params) => {
  const client = await getClient();
  const account = await getHDAccount();
  const callData = coerceParams(params);

  if (!account || !client) {
    throw new Error('Client not found or not logged in');
  }

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: (
        <CallSc
          fee={params.fee}
          functionName={params.functionName}
          at={params.at}
          args={params.args}
          coins={params.coins}
        />
      ),
    },
  });

  if (!confirm) {
    throw new Error('User denied calling smart contract');
  }
  const operationId = await client.smartContracts().callSmartContract(callData);
  await addAccountOperation(account.address!, operationId);
  return {
    operationId,
  };
};
