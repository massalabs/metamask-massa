import type { IRollsData } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

import { getClientWallet } from '../accounts/clients';
import type { Handler } from './handler';
import { addAccountOperation } from '../operations';
import { getHDAccount } from '../accounts/hd-deriver';

export type SellRollsParams = {
  fee: string;
  amount: string;
};

export type SellRollsResponse = {
  operationId: string;
};

/**
 * @description Coerce the sell rolls parameters by ensuring the parameters are present and are the correct type
 * @param params - The sell rolls parameters
 * @returns The sell rolls parameters
 * @throws If the fee or amount is missing or not a string
 */
const coerceParams = (params: SellRollsParams): IRollsData => {
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
 * @description Sells rolls using 'massa-web3' and adds the operation to the account
 * @param params - The sell rolls parameters
 * @returns The operation id
 */
export const sellRolls: Handler<SellRollsParams, SellRollsResponse> = async (
  params,
) => {
  const rollsData = coerceParams(params);
  const wallet = await getClientWallet();
  const account = await getHDAccount();

  if (!wallet) {
    throw new Error('Not logged in to metamask. Please log in and try again.');
  }

  if (!account) {
    throw new Error('Account not found or client not logged in');
  }

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Do you want to sell rolls ?**'),
        text(`**Amount:** ${rollsData.amount.toString()}`),
        text(`**Fee:** ${rollsData.fee.toString()}`),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied sell rolls');
  }

  const operationId = await wallet.sellRolls(rollsData);

  await addAccountOperation(account.address!, operationId[0]!);

  return { operationId: operationId[0]! };
};
