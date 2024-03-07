import type { ICallData } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

import { getClientByName } from '../accounts/clients';
import { getAccountByName } from '../accounts/manage-account';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';

export type CallSCParameters = {
  nickname: string;
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
  if (
    !params.nickname ||
    !params.fee ||
    !params.functionName ||
    !params.at ||
    !params.args ||
    !params.coins
  ) {
    throw new Error('All fields are required');
  } else if (typeof params.nickname !== 'string') {
    throw new Error('Nickname must be a string');
  } else if (typeof params.fee !== 'bigint') {
    throw new Error('Fee must be a bigint');
  } else if (typeof params.functionName !== 'string') {
    throw new Error('Function name must be a string');
  } else if (typeof params.at !== 'string') {
    throw new Error('At must be a string');
  } else if (!Array.isArray(params.args)) {
    throw new Error('Args must be an array');
  } else if (typeof params.coins !== 'string') {
    throw new Error('Coins must be a string');
  }
  return {
    fee: BigInt(params.fee),
    maxGas: params.nonPersistentExecution?.maxGas
      ? BigInt(params.nonPersistentExecution.maxGas)
      : (null as unknown as bigint),
    coins: BigInt(params.coins),
    targetAddress: params.at,
    functionName: params.functionName,
    parameter: params.args,
  };
};
// TODO: retrieve correct account from nickname
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
  const client = await getClientByName(params.nickname);
  const account = await getAccountByName(params.nickname);

  if (!account || !client) {
    throw new Error('Client not found');
  }

  const callData = coerceParams(params);
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to call the following smart contract?'),
        text(JSON.stringify(callData)),
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
