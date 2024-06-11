import type { DialogResult } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

import { MassaAccount } from '../account';
import type { Handler } from './handler';

/**
 * @description Shows the secret key of the active account with an alert dialog in metamask
 * @returns The secret key of the active account
 * @throws If the account is not found
 */
export const showSecretKey: Handler<void, DialogResult> = async () => {
  const account = await MassaAccount.getAccount();
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Are you sure to display your secret key?**'),
        text(
          `**Make sure no one else see's it, don't show it in public or crowded places!**`,
        ),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied showing secret key');
  }
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        text('Your secret key is:'),
        text(account.secretKey ?? '_No secret key found_'),
      ]),
    },
  });
};
