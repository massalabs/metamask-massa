import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';

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

      console.log('sign res', await response);
      expect(await response).toRespondWith({
        signature: '0x1b4',
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
