import type { IRollsData, WalletClient } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

import { getClientWallet } from '../accounts/clients';
import type { Handler } from './handler';

export type BuyRollsParams = {
  fee: string;
  amount: string;
};

export type BuyRollsResponse = {
  operationId: string;
};

const coerceParams = (params: BuyRollsParams): IRollsData => {
  if (!params.fee || typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
  if (!params.amount || typeof params.amount !== 'string') {
    throw new Error('Invalid params: amount must be a string');
  }
  return {
    fee: BigInt(params.fee),
    amount: BigInt(params.amount),
  };
};
/**
 * @description Buys rolls with the given amount and fee
 * @param params - The buy rolls parameters (fee and amount)
 * @returns The operation id of the buy rolls operation
 */
export const buyRolls: Handler<BuyRollsParams, BuyRollsResponse> = async (
  params,
) => {
  const rollsData = coerceParams(params);
  const wallet: WalletClient | undefined = await getClientWallet();

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Do you want to buy rolls ?**'),
        text(`**Amount:** ${rollsData.amount.toString()}`),
        text(`**Fee:** ${rollsData.fee.toString()}`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied buy rolls');
  }

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  const operationId = await wallet.buyRolls(rollsData);

  return { operationId: operationId[0]! };
};
