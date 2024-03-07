import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('set-active-account', () => {
    it('should set the active account to generated one', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.setActive',
        origin,
        params: {
          address: accounts[0].address,
        }
      });


      expect(await response).toRespondWith({ name: "Account 1", address: accounts[0].address });

      const response2 = request({
        method: 'account.getActive',
        origin,
      });

      expect(await response2).toRespondWith({ name: "Account 1", address: accounts[0].address });
    });

    it('should set the active account back to the default one', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.setActive',
        origin,
        params: {
          address: accounts[0].address,
        }
      });


      expect(await response).toRespondWith({ name: "Account 1", address: accounts[0].address });

      const accountList = ((await request({
        method: 'account.list',
        origin,
      })).response as any).result;

      const defaultAccount = accountList[0]!;

      const response2 = request({
        method: 'account.setActive',
        origin,
        params: {
          address: defaultAccount.address,
        }
      });

      expect(await response2).toRespondWith({ name: defaultAccount.name, address: defaultAccount.address });
    });
  });

  it('should throw an error when address is invalid', async () => {
    const { request } = await installSnap();
    const origin = 'Jest';
    const response = request({
      method: 'account.setActive',
      origin,
      params: {
        address: "AU00000000000000000000000000000000000000000000000000"
      }
    });

    expect(await response).toRespondWithError({
      code: expect.any(Number),
      message: "Account not found: AU00000000000000000000000000000000000000000000000000",
      stack: expect.any(String),
    });

  });
});

