import { getProvider } from '../accounts/provider';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';
import { CallSc } from '../components/CallSc';
import { Address, CallSCParams } from '@massalabs/massa-web3';
import { getActiveNetwork } from '../active-chain';

export type CallSCParameters = {
  fee?: string;
  functionName: string;
  at: string;
  args?: number[];
  coins?: string;
  maxGas?: string;
};

export type CallSCResponse = {
  operationId: string;
};

const validate = (params: CallSCParameters) => {
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
    throw new Error('Invalid params: args must be an array');
  }
  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
  if (params?.coins && typeof params.coins !== 'string') {
    throw new Error('Invalid params: coins must be a string');
  }
  if (params?.maxGas && typeof params.maxGas !== 'string') {
    throw new Error('Invalid params: maxGas must be a string');
  }
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
  validate(params);
  const provider = await getProvider();

  const networkInfos = await getActiveNetwork();
  const fee = params.fee ? params.fee : networkInfos.minimalFees;

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: (
        <CallSc
          fee={fee}
          functionName={params.functionName}
          at={params.at}
          args={params.args ?? []}
          coins={params.coins ?? '0'}
        />
      ),
    },
  });

  if (!confirm) {
    throw new Error('User denied calling smart contract');
  }
  const callSCParams: CallSCParams = {
    func: params.functionName,
    target: params.at,
    parameter: Uint8Array.from(params.args ?? []),
    fee: BigInt(fee),
  };

  if (params.coins) {
    callSCParams.coins = BigInt(params.coins);
  }
  if (params.maxGas) {
    callSCParams.maxGas = BigInt(params.maxGas);
  }
  const operation = await provider.callSC(callSCParams);
  await addAccountOperation(provider.address, operation.id);
  return {
    operationId: operation.id,
  };
};
