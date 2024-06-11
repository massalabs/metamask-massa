import type { Json } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

import { getAccount, getActiveAccount } from '../accounts/manage-account';
import type { Handler } from './handler';

export type ShowAccountCredentialsParams = {
  address?: string;
};

/**
 * @description Shows the credentials of the active account with an alert dialog in metamask
 * @param address - The address of the account to show the credentials for
 * @returns The dialog with the account credentials
 */
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

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Are you sure to display your credentials?**'),
        text(
          `**Make sure no one else see's them, don't show them in public or crowded places!**`,
        ),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied showing credentials');
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
