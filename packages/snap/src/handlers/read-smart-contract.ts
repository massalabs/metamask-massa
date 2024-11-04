import type { IReadData } from '@massalabs/massa-web3';
import { getClient } from '../accounts/clients';
import { getHDAccount } from '../accounts/hd-deriver';
import type { Handler } from './handler';
import { SnapError } from '@metamask/snaps-sdk';

export type ReadSCParameters = {
  fee?: string;
  functionName: string;
  at: string;
  args: number[];
  coins?: string;
  maxGas?: string;
  caller?: string;
};

export type ReadSCResponse = {
  data: number[];
  infos: {
    gasCost: number;
  };
};

/**
 * Coerce the call smart contract parameters by ensuring the parameters are present and are the correct type
 * @param params - The call smart contract parameters
 * @returns The call smart contract parameters
 * @throws If the nickname, fee, functionName, at, args, or coins is missing or not a string
 */
const coerceParams = (params: ReadSCParameters): IReadData => {
  // mandatory parameters
  if (!params.functionName || typeof params.functionName !== 'string') {
    throw new Error('Invalid params: functionName must be a string');
  } else if (!params.at || typeof params.at !== 'string') {
    throw new Error('Invalid params: at must be a string');
  } else if (!params.args || !Array.isArray(params.args)) {
    throw new Error('Invalid params: args must be an array');
    // optionnal parameters
  } else if (params?.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  } else if (params?.coins && typeof params.coins !== 'string') {
    throw new Error('Invalid params: coins must be a string');
  } else if (params?.maxGas && typeof params.maxGas !== 'string') {
    throw new Error('Invalid params: maxGas must be a string');
  } else if (params?.caller && typeof params.caller !== 'string') {
    throw new Error('Invalid params: caller must be a string');
  }

  const req = {
    targetAddress: params.at,
    targetFunction: params.functionName,
    parameter: params.args,
  } as IReadData;

  if (params.fee) {
    req.fee = BigInt(params.fee);
  }
  if (params.coins) {
    req.coins = BigInt(params.coins);
  }
  if (params.maxGas) {
    req.maxGas = BigInt(params.maxGas);
  }
  if (params.caller) {
    req.callerAddress = params.caller;
  }
  return req;
};
/**
 * @description Calls a smart contract with the given parameters
 * @param params - The call smart contract parameters (see `ReadSCParameters` type and massa standard)
 * @returns smart contract result data and gas cost
 * @throws If the user denies the transaction
 * @throws If the client or account is not found
 */
export const readSmartContract: Handler<
  ReadSCParameters,
  ReadSCResponse
> = async (params) => {
  const client = await getClient();
  const account = await getHDAccount();
  const callData = coerceParams(params);

  if (!account || !client) {
    throw new SnapError('Client not found or not logged in');
  }

  const res = await client.smartContracts().readSmartContract(callData);

  return {
    data: Array.from(res.returnValue),
    infos: {
      gasCost: res.info.gas_cost,
    },
  };
};
