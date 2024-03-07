import { expect } from '@jest/globals';
import { SnapConfirmationInterface, installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';
import { setActiveAccount } from './utils/setActiveAccount';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('transfer', () => {
    it('should return an operation id', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('**Do you want to send the following transaction?**'),
          text(`**Recipient:** ${accounts[1].address}`),
          text('**Amount:** 1000000000000000'),
          text('**Fee:** 1000000000000000'),
        ]),
      );

      await ui.ok();
      expect(await response).toRespondWith({
        operationId: expect.any(String),
      });

      const operations = await request({
        method: 'account.getOperations',
        origin,
      });
      expect((operations.response as any).result.operations).toHaveLength(1);
    });

    it('should throw an error if the user deny the request', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('**Do you want to send the following transaction?**'),
          text(`**Recipient:** ${accounts[1].address}`),
          text('**Amount:** 1000000000000000'),
          text('**Fee:** 1000000000000000'),
        ]),
      );

      await ui.cancel();
      expect(await response).toRespondWithError({
        code: -32603,
        message: 'User denied sending transaction',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
          fee: 1000000,
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
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
          fee: '1000000000000000',
          amount: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: amount must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the recipientAddress is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: 123,
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: recipientAddress must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
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
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: accounts[1].address,
          fee: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: amount must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the recipientAddress is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          fee: '1000000000000000',
          amount: '1000000000000000',
        },
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: recipientAddress must be a string',
        stack: expect.any(String),
      });
    });
  });
});
