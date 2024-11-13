import type { Json } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

import { getHDAccount } from '../accounts/hd-deriver';
import type { Handler } from './handler';
import { ShowKeys } from '../components/ShowKeys';

export type ShowAccountCredentialsParams = {
  address: string;
};

/**
 * @description Shows the credentials of the active account with an alert dialog in metamask
 * @param params
 * @param address - The address of the account to show the credentials for
 * @returns The dialog with the account credentials
 */
export const showAccountCredentials: Handler<
  ShowAccountCredentialsParams,
  Json
> = async (params) => {
  const account = await getHDAccount();

  if (!account) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }
  if (params.address !== account.address) {
    throw new Error(`Account not found: ${params.address}`);
  }

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('**Are you sure you want to display your credentials?**'),
        text(
          `Make sure no one else sees them, and don't show them in crowded or public places !`,
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
      content: (
        <ShowKeys
          address={account.address || ''}
          publicKey={account.publicKey || ''}
          secretKey={account.secretKey || ''}
        />
      ),
    },
  });
};
