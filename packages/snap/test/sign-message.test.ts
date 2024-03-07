import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';

describe('onRpcRequest', () => {
  describe('sign-message', () => {
    it('should not sign a message with not imported account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);

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
        publicKey: 'P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d',
        signature: [
          49, 57, 87, 81, 117, 53, 49, 74, 103, 103, 111, 55, 111, 89, 57, 72,
          75, 76, 57, 101, 90, 72, 107, 115, 85, 112, 112, 68, 57, 69, 102, 122,
          122, 111, 56, 78, 52, 110, 69, 107, 52, 101, 102, 103, 81, 83, 81, 70,
          52, 80, 100, 81, 112, 49, 114, 65, 49, 84, 75, 78, 115, 106, 120, 77,
          80, 105, 77, 56, 50, 71, 97, 68, 109, 87, 53, 107, 78, 88, 50, 112,
          121, 80, 80, 51, 118, 49, 78, 113, 105, 88, 121, 112, 56, 116,
        ],
      });
    });

    it('should sign a message', async () => {
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
        code: -32603,
        message:
          'Account not found: AU123GG5gg45Wbf4TC8jm2RkTLz1q63tcfdfdsfsdymy2pY6fTaYcdejvfsdsd',
        stack: expect.any(String),
      });
    });
  });
});
