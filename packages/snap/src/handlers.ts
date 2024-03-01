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
import { RpcHandler } from './api';

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
  const wallet = await MassaAccount.getWeb3Client();
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

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        text('Sending transaction...'),
        text(
          wallet.wallet().getBaseAccount()?.address() ?? '_No address found_',
        ),
      ]),
    },
  });

  try {
    const res = await RpcHandler.sendTransaction(deserialized);
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([text('Transaction sent!')]),
      },
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return [error.message];
  }
};

export const callSmartContract: Handler<ICallData, string> = async (
  params: ICallData,
) => {
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
  return client.smartContracts().callSmartContract(params);
};
