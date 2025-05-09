import { panel, text } from '@metamask/snaps-sdk';

import type { Handler } from './handler';
import { addAccountOperation } from '../operations';
import { getProvider } from '../accounts/provider';
import { getActiveNetwork } from '../active-chain';
import { formatMas } from '@massalabs/massa-web3';

export type SellRollsParams = {
  fee: string;
  amount: string;
};

export type SellRollsResponse = {
  operationId: string;
};

const validate = (params: SellRollsParams) => {
  if (!params.amount || typeof params.amount !== 'string') {
    throw new Error('Invalid params: amount must be a string');
  }
  // optionnal parameters
  if (params.fee && typeof params.fee !== 'string') {
    throw new Error('Invalid params: fee must be a string');
  }
};
/**
 * @description Sells rolls using 'massa-web3' and adds the operation to the account
 * @param params - The sell rolls parameters
 * @returns The operation id
 */
export const sellRolls: Handler<SellRollsParams, SellRollsResponse> = async (
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
        text('**Do you want to sell rolls ?**'),
        text(`**Amount:** ${params.amount}`),
        text(`**Fee:** ${formatMas(fee)} MAS`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sell rolls');
  }

  const operation = await provider.sellRolls(amount, { fee });

  await addAccountOperation(provider.address, operation.id);

  return { operationId: operation.id };
};
