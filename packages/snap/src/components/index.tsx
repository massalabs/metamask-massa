import { getHDAccount } from '../accounts/hd-deriver';
import { ShowKeys } from './ShowKeys';
import { ShowKeysConfirmation } from './ShowKeysConfirmation';

export async function showKeysConfirmation() {
  await snap.request({
    method: 'snap_dialog',
    params: {
      content: <ShowKeysConfirmation />,
    },
  });
}

export async function showKeys(id: string) {
  const account = await getHDAccount();

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <ShowKeys
          address={account.address.toString()}
          publicKey={account.publicKey.toString()}
          secretKey={account.privateKey.toString()}
        />
      ),
    },
  });
}
