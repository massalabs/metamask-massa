import { toMAS, type ITransactionData } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';
import { getHDAccount } from '../accounts/hd-deriver';
import { getClient } from '../accounts/clients';

export type TransferParams = {
  recipientAddress: string;
  amount: bigint;
  fee: bigint;
};

export type TransferResponse = {
  operationId: string;
};

/**
 * Coerce the transfer parameters by ensuring the parameters are present and are the correct type
 * @param params - The transfer parameters
 * @returns The transaction data
 * @throws If the recipient address, amount, or fee is missing or not a string
 */
const coerceParams = (params: TransferParams): ITransactionData => {
  if (!params.recipientAddress || typeof params.recipientAddress !== 'string') {
    throw new Error('Invalid params: recipientAddress must be a string');
  } else if (!params.amount || typeof params.amount !== 'string') {
    throw new Error('Invalid params: amount must be a string');
  } else if (!params.fee || typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
  return {
    recipientAddress: params.recipientAddress,
    amount: BigInt(params.amount),
    fee: BigInt(params.fee),
  };
};

/**
 * Makes a transaction using 'massa-web3' and adds the operation to the account
 * @param params - The transfer parameters
 * @returns The operation id
 * @throws If the user denies the transaction
 * @throws If no operations are returned (likely do to a to a fail in 'massa-web3' check parameters)
 */
export const transfer: Handler<TransferParams, TransferResponse> = async (
  params,
) => {
  const account = await getHDAccount();
  const client = await getClient();
  const deserialized = coerceParams(params);

  if (!account || !client) {
    throw new Error('Not logged in to metamask. Please log in and try again.');
  }

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Do you want to send the following transaction?**'),
        text(`**Recipient:** ${params.recipientAddress}`),
        text(`**Amount:** ${toMAS(params.amount)}`),
        text(`**Fee:** ${toMAS(params.fee)}`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sending transaction');
  }

  const operations = await client.wallet().sendTransaction(deserialized);
  if (!operations.length) {
    throw new Error('No operations returned');
  }
  await addAccountOperation(account.address!, operations[0]!);

  return {
    operationId: operations[0]!,
  };
};
