import type { ITransactionData } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

import { MassaAccount } from '../account';
import { getActiveClient } from '../accounts/clients';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';

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
  if (!params.recipientAddress || !params.amount || !params.fee) {
    throw new Error('Recipient address is required');
  } else if (typeof params.recipientAddress !== 'string') {
    throw new Error('Recipient address must be a string');
  } else if (typeof params.amount !== 'string') {
    throw new Error('Amount must be a string');
  } else if (typeof params.fee !== 'string') {
    throw new Error('Fee must be a string');
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
  const client = await getActiveClient();
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to send the following transaction?'),
        text(`Recipient: ${params.recipientAddress}`),
        text(`Amount: ${params.amount}`),
        text(`Fee: ${params.fee}`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sending transaction');
  }

  const deserialized = coerceParams(params);

  const operations = await client.wallet().sendTransaction(deserialized);
  if (!operations.length) {
    throw new Error('No operations returned');
  }
  const address = (await MassaAccount.getAccount()).address!;
  await addAccountOperation(address, operations[0]!);

  return {
    operationId: operations[0]!,
  };
};
