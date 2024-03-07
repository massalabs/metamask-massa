import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { importFixAccount } from './utils/importFixAccount';

describe('onRpcRequest', () => {
  describe('show-credentials', () => {
    it('should show credentials', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const account = await importFixAccount(request);

      const response = request({
        method: 'account.showCredentials',
        origin,
        params: {
          address: account.address,
        },
      });

      expect(await response).toRespondWith({
        address: account.address,
        publicKey: account.publicKey,
      });
    });

    it('should not show credentials for not imported account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'account.showCredentials',
        origin,
        params: {
          address: 'AU199wi4sBM2DyBeje88WQveDdTWGCs461VocsHpbT7FWiPyfqxD',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message:
          'Account not found: AU199wi4sBM2DyBeje88WQveDdTWGCs461VocsHpbT7FWiPyfqxD',
        stack: expect.any(String),
      });
    });
  });
});
