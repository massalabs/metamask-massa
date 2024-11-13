import { getBalance, getNetwork } from '../handlers';
import { getHDAccount } from '../accounts/hd-deriver';
import React from 'react';
import { ShowKeys } from './ShowKeys';
import { HomePage } from './HomePage';
import { ShowKeysConfirmation } from './ShowKeysConfirmation';

export async function showKeysConfirmation() {
  await snap.request({
    method: 'snap_dialog',
    params: {
      content: <ShowKeysConfirmation />,
    },
  });
}

export async function showKeys(id) {
  const account = await getHDAccount();

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <ShowKeys
          address={account.address || ''}
          publicKey={account.publicKey || ''}
          secretKey={account.secretKey || ''}
        />
      ),
    },
  });
}
