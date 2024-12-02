import { panel, text } from '@metamask/snaps-sdk';

import type { Handler } from './handler';
import { addAccountOperation } from '../operations';
import { getProvider } from '../accounts/provider';
import { Mas } from '@massalabs/massa-web3';
import { getActiveNetwork } from '../active-chain';

export type BuyRollsParams = {
  fee?: string;
  amount: string;
};

export type BuyRollsResponse = {
  operationId: string;
};

const validate = (params: BuyRollsParams) => {
  if (!params.amount || typeof params.amount !== 'string') {
    throw new Error('Invalid params: amount must be a string');
  }
  // optionnal parameters
  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
};

/**
 * @description Buys rolls with the given amount and fee
 * @param params - The buy rolls parameters (fee and amount)
 * @returns The operation id of the buy rolls operation
 */
export const buyRolls: Handler<BuyRollsParams, BuyRollsResponse> = async (
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
        text('**Do you want to buy rolls ?**'),
        text(`**Amount:** ${params.amount.toString()}`),
        text(`**Fee:** ${Mas.toString(fee)} MAS`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied buy rolls');
  }

  const operation = await provider.buyRolls(amount, { fee });

  await addAccountOperation(provider.address, operation.id);

  return { operationId: operation.id };
};
