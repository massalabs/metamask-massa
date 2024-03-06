import type { Json } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

import { getAccount, getActiveAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type ShowAccountCredentialsParams = {
  address?: string;
};

export const showAccountCredentials: Handler<
  ShowAccountCredentialsParams,
  Json
> = async ({ address }) => {
  const account =
    address !== undefined
      ? await getAccount(address)
      : await getActiveAccount();

  if (!account) {
    throw new Error(`Account not found: ${address}`);
  }

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        text('**Account Credentials:**'),
        text(`Name: ${account.name}`),
        text(`Address: ${account.address}`),
        text(`Public Key: ${account.publicKey}`),
        text(`Secret Key: ${account.secretKey}`),
      ]),
    },
  });
};
