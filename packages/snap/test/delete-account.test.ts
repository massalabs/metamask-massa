import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('delete-account', () => {
    it('should delete a generated account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accounts = await generateAccounts(request, 2);

      const response = request({
        method: 'account.delete',
        origin,
        params: {
          address: accounts[0]!.address,
        },
      });

      expect(await response).toRespondWith({
        response: "OK"
      });
      const listResponse = await request({
        method: 'account.list',
        origin
      });

      expect(((await listResponse).response as any).result).toHaveLength(2); // default account + added account (2) - deleted one
    });



    it('should return an error when address is invalid', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accounts = await generateAccounts(request, 2);
      const response = request({
        method: 'account.delete',
        origin,
        params: {
          address: "AU00000000000000000000000000000000000000000000000000" // invalid address
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: "Account not found: AU00000000000000000000000000000000000000000000000000"
      });

      const listResponse = await request({
        method: 'account.list',
        origin
      });

      expect(((await listResponse).response as any).result).toHaveLength(3); // default account + added account (2)
    });
  });
});

