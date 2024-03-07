import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';

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
      const ui = await response.getInterface();
      expect(ui.type).toBe('alert');
      expect(ui).toRender(
        panel([
          text('**Account Credentials:**'),
          text(`Name: Account 1`),
          text(`Address: ${account.address}`),
          text(`Public Key: ${account.publicKey}`),
          text(`Secret Key: ${account.privateKey}`),
        ]),
      );

      await ui.ok();
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
