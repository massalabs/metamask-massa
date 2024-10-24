import { expect } from '@jest/globals';
import { WalletClient } from '@massalabs/massa-web3';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';

describe('onRpcRequest', () => {
  describe('clear-operations', () => {
    it('should clear operations for account', async () => {
      const { request } = await installSnap();
      const newAccount = await WalletClient.walletGenerateNewAccount();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.sendTransaction',
        origin,
        params: {
          recipientAddress: newAccount.address,
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
      expect(
        (operationsAfterClear.response as any).result.operations,
      ).toHaveLength(0);
    });
  });
});
