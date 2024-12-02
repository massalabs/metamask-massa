import { panel, text } from '@metamask/snaps-sdk';
import { addAccountOperation } from '../operations';
import type { Handler } from './handler';
import { Address, Mas } from '@massalabs/massa-web3';
import { getProvider } from '../accounts/provider';
import { getActiveNetwork } from '../active-chain';

export type TransferParams = {
  recipientAddress: string;
  amount: string;
  fee?: string;
};

export type TransferResponse = {
  operationId: string;
};

const validate = (params: TransferParams) => {
  if (!params.recipientAddress || typeof params.recipientAddress !== 'string') {
    throw new Error('Invalid params: recipientAddress must be a string');
  }
  Address.fromString(params.recipientAddress);

  if (!params.amount || typeof params.amount !== 'string') {
    throw new Error('Invalid params: amount must be a string');
  }
  // optionnal parameters
  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
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
  validate(params);
  const provider = await getProvider();
  const networkInfos = await getActiveNetwork();
  const amount = BigInt(params.amount);
  const fee = BigInt(params.fee ? params.fee : networkInfos.minimalFees);

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Do you want to send the following transaction?**'),
        text(`**Recipient:** ${params.recipientAddress}`),
        text(`**Amount:** ${Mas.toString(amount)} MAS`),
        text(`**Fee:** ${Mas.toString(fee)} MAS`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sending transaction');
  }

  const operations = await provider.transfer(params.recipientAddress, amount, {
    fee,
  });

  await addAccountOperation(provider.address, operations.id);

  return {
    operationId: operations.id,
  };
};
