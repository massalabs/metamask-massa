import { Address, ReadSCParams } from '@massalabs/massa-web3';
import type { Handler } from './handler';
import { getProvider } from '../accounts/provider';

export type ReadSCParameters = {
  fee?: string;
  functionName: string;
  at: string;
  args?: number[];
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

const validate = (params: ReadSCParameters) => {
  // mandatory parameters
  if (!params.functionName || typeof params.functionName !== 'string') {
    throw new Error('Invalid params: functionName must be a string');
  }
  if (!params.at || typeof params.at !== 'string') {
    throw new Error('Invalid params: at must be a string');
  }
  Address.fromString(params.at);

  // optionnal parameters
  if (params.args && !Array.isArray(params.args)) {
    throw new Error('Invalid params: args must be an Uint8Array');
  }
  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
  if (params.coins && typeof params.coins !== 'string') {
    throw new Error('Invalid params: coins must be a string');
  }
  if (params.maxGas && typeof params.maxGas !== 'string') {
    throw new Error('Invalid params: maxGas must be a string');
  }
  if (params.caller && typeof params.caller !== 'string') {
    throw new Error('Invalid params: caller must be a string');
  }
  if (params.caller) {
    Address.fromString(params.caller);
  }
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
  validate(params);
  const provider = await getProvider();

  const readSCParams: ReadSCParams = {
    func: params.functionName,
    target: params.at,
    parameter: Uint8Array.from(params.args ?? []),
  };
  if (params.fee) {
    readSCParams.fee = BigInt(params.fee);
  }
  if (params.coins) {
    readSCParams.coins = BigInt(params.coins);
  }
  if (params.maxGas) {
    readSCParams.maxGas = BigInt(params.maxGas);
  }
  if (params.caller) {
    readSCParams.caller = params.caller;
  }

  const res = await provider.readSC(readSCParams);
  return {
    data: Array.from(res.value),
    infos: {
      gasCost: res.info.gasCost,
    },
  };
};
