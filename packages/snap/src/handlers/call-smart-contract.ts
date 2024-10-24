import type { ICallData } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

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
  nonPersistentExecution?: {
    isNPE: boolean;
    maxGas: string;
  };
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
  if (!params.fee || typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  } else if (!params.functionName || typeof params.functionName !== 'string') {
    throw new Error('Invalid params: functionName must be a string');
  } else if (!params.at || typeof params.at !== 'string') {
    throw new Error('Invalid params: at must be a string');
  } else if (!params.args || !Array.isArray(params.args)) {
    throw new Error('Invalid params: args must be an array');
  } else if (!params.coins || typeof params.coins !== 'string') {
    throw new Error('Invalid params: coins must be a string');
  } else if (
    params.nonPersistentExecution?.maxGas &&
    typeof params.nonPersistentExecution.maxGas !== 'string'
  ) {
    throw new Error('Invalid params: maxGas must be a string');
  }
  return {
    fee: BigInt(params.fee),
    maxGas: params.nonPersistentExecution?.maxGas
      ? BigInt(params.nonPersistentExecution.maxGas)
      : (null as unknown as bigint),
    coins: BigInt(params.coins),
    targetAddress: params.at,
    targetFunction: params.functionName,
    parameter: params.args,
  };
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
      content: panel([
        text('Do you want to call the following smart contract?'),
        text(`**Conttract:** ${params.at}`),
        text(`**Function:** ${params.functionName}`),
        text(`**Fee:** ${params.fee}`),
        text(`**args:** ${params.args ? JSON.stringify(params.args) : '[]'}`),
        text(`**coins:** ${params.coins}`),
      ]),
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
