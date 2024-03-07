import { expect } from '@jest/globals';
import { SnapConfirmationInterface, installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';
import { setActiveAccount } from './utils/setActiveAccount';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('clear-operations', () => {
    it('should clear operations for default account', async () => {
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

      await ui.ok();
      await response;

      const operations = await request({
        method: 'account.getOperations',
        origin,
      });
      expect((operations.response as any).result.operations).toHaveLength(1);

      const clearResponse = request({
        method: 'account.clearOperations',
        origin,
      });
      expect(await clearResponse).toRespondWith({
        response: 'OK',
      });

      const operationsAfterClear = await request({
        method: 'account.getOperations',
        origin,
      });
      expect((operationsAfterClear.response as any).result.operations).toHaveLength(0);
    });

    it('should clear operations for a specific account', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      await setActiveAccount(request, accounts[0].address);
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
      await ui.ok();
      expect(await response).toRespondWith({
        operationId: expect.any(String),
      });

      const operations = await request({
        method: 'account.getOperations',
        origin,
      });
      expect((operations.response as any).result.operations).toHaveLength(1);

      await setActiveAccount(request, accounts[1].address);

      const clearResponse = request({
        method: 'account.clearOperations',
        origin,
        params: {
          address: accounts[0].address,
        },
      });
      expect(await clearResponse).toRespondWith({
        response: 'OK',
      });

      const operationsAfterClear = await request({
        method: 'account.getOperations',
        origin,
        params: {
          address: accounts[0].address,
        },
      });
      expect((operationsAfterClear.response as any).result.operations).toHaveLength(0);
    });

    it('should return an error if the account does not exist', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const clearResponse = request({
        method: 'account.clearOperations',
        origin,
        params: {
          address: 'AU12PsWbf4TC8jm2RkTLz1q63tcuTd1rxJFymy2pY6fTaYcdejvWy',
        },
      });

      expect(await clearResponse).toRespondWith({
        response: 'ERROR',
        message: 'Account not found: AU12PsWbf4TC8jm2RkTLz1q63tcuTd1rxJFymy2pY6fTaYcdejvWy',
      });
    });
  });
});
