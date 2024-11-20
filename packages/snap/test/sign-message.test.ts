import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';

import { setNetwork } from './utils/setNetwork';
import type { GetActiveAccountResponse } from 'src/handlers/get-active-account';
import { DefaultProviderUrls } from '@massalabs/massa-web3';

describe('onRpcRequest', () => {
  describe('sign-message', () => {
    it('should sign a message', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const account: GetActiveAccountResponse = (
        (await request({
          method: 'account.getActive',
          origin,
        })) as any
      ).response.result;
      const response = request({
        method: 'account.sign',
        origin,
        params: {
          address: account.address,
          data: [10, 0, 0, 0, 77, 121, 32, 77, 101, 115, 115, 97, 103, 101], // My Message in bytes
        },
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;

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
        signature:
          '122SBUmi3cJhZh4a3a73bxe4VMhJiSsbNFp3q8WA5SeC4Do6BMtmqZ1NXv9JeCnKCJABN2HYHMQpX7NGQm2MZ5f1AbdQaN',
      });
    });

    it('should not sign a message with another account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
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
