import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';
import type { ListAccountsResponseItem } from 'src/handlers';

import { setNetwork } from './utils/setNetwork';

describe('onRpcRequest', () => {
  describe('sign-message', () => {
    it('should sign a message', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account: ListAccountsResponseItem = (
        (await request({
          method: 'account.list',
          origin,
        })) as any
      ).response.result[0]!;

      const response = request({
        method: 'account.sign',
        origin,
        params: {
          address: account.address,
          data: [10, 0, 0, 0, 77, 121, 32, 77, 101, 115, 115, 97, 103, 101], // My Message in bytes
        },
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('Do you want to sign the following message ?'),
          text(
            [
              10, 0, 0, 0, 77, 121, 32, 77, 101, 115, 115, 97, 103, 101,
            ].toString(),
          ),
        ]),
      );

      await ui.ok();
      expect(await response).toRespondWith({
        publicKey: 'P12BYyRbBF72Ft1N87e5JaVg4Ua7LkmTGBSm6hhQC7M5L2KNJiSt',
        signature: [
          49, 50, 50, 83, 66, 85, 109, 105, 51, 99, 74, 104, 90, 104, 52, 97,
          51, 97, 55, 51, 98, 120, 101, 52, 86, 77, 104, 74, 105, 83, 115, 98,
          78, 70, 112, 51, 113, 56, 87, 65, 53, 83, 101, 67, 52, 68, 111, 54,
          66, 77, 116, 109, 113, 90, 49, 78, 88, 118, 57, 74, 101, 67, 110, 75,
          67, 74, 65, 66, 78, 50, 72, 89, 72, 77, 81, 112, 88, 55, 78, 71, 81,
          109, 50, 77, 90, 53, 102, 49, 65, 98, 100, 81, 97, 78,
        ],
      });
    });

    it('should not sign a message with another account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sign',
        origin,
        params: {
          address:
            'AU123GG5gg45Wbf4TC8jm2RkTLz1q63tcfdfdsfsdymy2pY6fTaYcdejvfsdsd',
          data: [10, 0, 0, 0, 77, 121, 32, 77, 101, 115, 115, 97, 103, 101], // My Message in bytes
        },
      });
      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message:
          'Account not found: AU123GG5gg45Wbf4TC8jm2RkTLz1q63tcfdfdsfsdymy2pY6fTaYcdejvfsdsd',
        stack: expect.any(String),
      });
    });
  });
});
