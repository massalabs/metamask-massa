import { addAccountOperation } from "../operations";
import { MassaAccount } from "../account";
import { Handler } from "./handler";
import { ITransactionData } from "@massalabs/massa-web3";
import { panel, text } from "@metamask/snaps-sdk";
import { getActiveClient } from "../accounts/clients";

export type TransferParams = {
  recipientAddress: string;
  amount: string;
  fee: string;
};

export type TransferResponse = {
  operationId: string;
};

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
}

export const transfer: Handler<TransferParams, TransferResponse> = async (params) => {
  const client = await getActiveClient();
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

  const operations = await client.wallet().sendTransaction(coerceParams(params));
  if (!operations.length) {
    throw new Error('No operations returned');
  }
  const address = (await MassaAccount.getAccount()).address!;
  await addAccountOperation(address, operations[0]!);

  return {
    operationId: operations[0]!
  }
};
