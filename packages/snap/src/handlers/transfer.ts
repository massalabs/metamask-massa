import { MassaAccount } from "../account";
import { Handler } from "./handler";
import { ITransactionData } from "@massalabs/massa-web3";
import { panel, text } from "@metamask/snaps-sdk";

export type TransferParams = {
  recipientAddress: string;
  amount: string;
  fee: string;
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

export const transfer: Handler<TransferParams, string[]> = async (params) => {
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

  return client.wallet().sendTransaction(coerceParams(params));
};
