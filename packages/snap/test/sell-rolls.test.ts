import { expect } from '@jest/globals';
import { SnapConfirmationInterface, installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';
import { setActiveAccount } from './utils/setActiveAccount';

describe('onRpcRequest', () => {
  describe('sell-rolls', () => {
    it('should return an operation id', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('**Do you want to sell rolls ?**'),
          text('**Amount:** 1000000000000000'),
          text('**Fee:** 1000000000000000'),
        ]),
      );

      await ui.ok();
      expect(await response).toRespondWith({
        operationId: expect.any(String),
      });
    });

    it('should throw an error if the user deny the request', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('**Do you want to sell rolls ?**'),
          text('**Amount:** 1000000000000000'),
          text('**Fee:** 1000000000000000'),
        ]),
      );

      await ui.cancel();
      expect(await response).toRespondWithError({
        code: -32603,
        message: 'User denied sell rolls',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          fee: 100000000,
          amount: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: fee must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the amount is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          fee: '1000000000000000',
          amount: 100000000,
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: amount must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          amount: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: fee must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the amount is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const account = await importFixAccount(request);
      await setActiveAccount(request, account.address)

      const response = request({
        method: 'account.sellRolls',
        origin,
        params: {
          fee: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: amount must be a string',
        stack: expect.any(String),
      });
    });
  });
});
