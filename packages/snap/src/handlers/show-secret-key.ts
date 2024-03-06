import type { DialogResult } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

import { MassaAccount } from '../account';
import type { Handler } from './handler';

export const showSecretKey: Handler<void, DialogResult> = async () => {
  const account = await MassaAccount.getAccount();
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
