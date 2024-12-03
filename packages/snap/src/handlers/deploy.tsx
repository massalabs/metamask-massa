import { getProvider } from '../accounts/provider';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';
import { DeploySc } from '../components/DeploySc';
import { DeploySCParams } from '@massalabs/massa-web3';
import { getActiveNetwork } from '../active-chain';

export type DeploySCParameters = {
  bytecode: number[];
  fee?: string;
  args?: number[];
  coins?: string;
  maxCoins?: string;
  maxGas?: string;
};

export type DeploySCResponse = {
  operationId: string;
};

const validate = (params: DeploySCParameters) => {
  // mandatory parameters
  if (!params.bytecode || !Array.isArray(params.bytecode)) {
    throw new Error('Invalid params: bytecode must be an array');
  }

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
  if (params?.maxCoins && typeof params.maxCoins !== 'string') {
    throw new Error('Invalid params: maxCoins must be a string');
  }
};
/**
 * @description Deploy a smart contract
 * @param params - DeploySCParameters
 * @returns The operation id
 * @throws If the user denies the transaction
 */
export const deployContract: Handler<
  DeploySCParameters,
  DeploySCResponse
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
        <DeploySc
          fee={fee}
          args={params.args ?? []}
          coins={params.coins ?? '0'}
          maxCoins={params.maxCoins ?? 'none'}
        />
      ),
    },
  });

  if (!confirm) {
    throw new Error('User denied calling smart contract');
  }
  const deploySCParams: DeploySCParams = {
    parameter: Uint8Array.from(params.args ?? []),
    byteCode: Uint8Array.from(params.bytecode),
    fee: BigInt(fee),
  };

  if (params.coins) {
    deploySCParams.coins = BigInt(params.coins);
  }
  if (params.maxGas) {
    deploySCParams.maxGas = BigInt(params.maxGas);
  }
  // bypass protected attribute of deploy function
  const operationId: string = await (provider as any).deploy(deploySCParams);
  await addAccountOperation(provider.address, operationId);
  return {
    operationId,
  };
};
