import { expect } from '@jest/globals';
import { installSnap, SnapConfirmationInterface } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';
import { GetActiveAccountResponse } from 'src/handlers/get-active-account';

describe('onRpcRequest', () => {
  describe('show-credentials', () => {
    it('should show credentials', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const defaultAccount: GetActiveAccountResponse = (
        (await request({
          method: 'account.getActive',
          origin,
        })) as any
      ).response.result;

      const response = request({
        method: 'account.showCredentials',
        origin,
        params: {
          address: defaultAccount.address,
        },
      });

      const confirmationUi =
        (await response.getInterface()) as SnapConfirmationInterface;

      expect(confirmationUi.type).toBe('confirmation');
      expect(confirmationUi).toRender(
        panel([
          text('**Are you sure you want to display your credentials?**'),
          text(
            `Make sure no one else sees them, and don't show them in crowded or public places !`,
          ),
        ]),
      );
      await confirmationUi.ok();

      const ui = (await response.getInterface()) as SnapConfirmationInterface;
      expect(ui.type).toBe('alert');

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
        code: expect.any(Number),
        message:
          'Account not found: AU199wi4sBM2DyBeje88WQveDdTWGCs461VocsHpbT7FWiPyfqxD',
        stack: expect.any(String),
      });
    });
  });
});