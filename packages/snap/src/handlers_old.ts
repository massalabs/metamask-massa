/* eslint-disable no-restricted-globals */
import { fromMAS } from '@massalabs/massa-web3';
import type {
  ICallData,
  ISignature,
  ITransactionData,
} from '@massalabs/massa-web3';
import type { DialogResult } from '@metamask/snaps-sdk';
import {
  Json,
  JsonRpcParams,
  JsonRpcRequest,
  panel,
  text,
} from '@metamask/snaps-sdk';

import { MassaAccount } from './account';
import { RpcHandler } from './old/api';
import { CallSCParameters, CallSCResponse } from './dto';

export type Handler<T, O> = (params: T) => Promise<O>;

export const getAddress: Handler<void, string> = async () => {
  const account = await MassaAccount.getAccount();
  return account.address!;
};

export const showSecretKey: Handler<void, DialogResult> = async () => {
  const account = await MassaAccount.getAccount();
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        text('Your secret key is:'),
        text(account.secretKey ?? '_No secret key found_'),
      ]),
    },
  });
};

export type SignMessageParams = {
  data: string | Buffer;
  chainId: bigint;
};


export const signMessage: Handler<SignMessageParams, ISignature> = async ({ data, chainId}) => {
  const wallet = await MassaAccount.getWalletClient();
  const address = (await MassaAccount.getAccount()).address!;
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to sign the following message?'),
        text(data.toString()),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied signing message');
  }

  return wallet.signMessage(data, chainId, address);
};

export const transfer: Handler<ITransactionData, string[]> = async (params) => {
  const client = await MassaAccount.getWeb3Client();
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to send the following transaction?'),
        text(JSON.stringify(params)),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sending transaction');
  }
  const deserialized: ITransactionData = {
    recipientAddress: params.recipientAddress,
    amount: fromMAS(BigInt(params.amount)),
    fee: BigInt(params.fee),
  };

  return client.wallet().sendTransaction(deserialized);
};

export const callSmartContract: Handler<CallSCParameters, CallSCResponse> = async (params) => {
  const client = await MassaAccount.getWeb3Client();
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to call the following smart contract?'),
        text(JSON.stringify(params)),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied calling smart contract');
  }
  const deserialized: ICallData = {
    fee: BigInt(params.fee),
    maxGas: params.nonPersistentExecution?.maxGas !== undefined ? BigInt(params.nonPersistentExecution.maxGas) : null as unknown as bigint,
    coins: params.coins !== undefined ? BigInt(params.coins) : BigInt(0),
    targetAddress: params.at,
    functionName: params.functionName,
    parameter: params.args,
  }

  return {
    operationId: await client.smartContracts().callSmartContract(deserialized)
  }
};
