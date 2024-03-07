import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { ListAccountsResponse } from 'src/handlers';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('generate-account', () => {
    it('should generate an account with a given name', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accountName = 'Test Account';

      const response = request({
        method: 'account.generateNewAccount',
        origin,
        params: {
          name: accountName
        }
      });

      expect(await response).toRespondWith({
        address: expect.any(String),
        name: accountName
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(2); // default account + added account
    });


    it('should throw an error account when name is empty', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accountName = '';

      const response = request({
        method: 'account.generateNewAccount',
        origin,
        params: {
          name: accountName
        }
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: name must be a string',
        stack: expect.any(String),
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(1); // default account
    });

    it('should throw an error when name is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.generateNewAccount',
        origin,
        params: {
          name: 123
        }
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: name must be a string',
        stack: expect.any(String),
       });
    });

    it('should throw an error when name is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.generateNewAccount',
        origin,
        params: {}
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: name must be a string',
        stack: expect.any(String),
       });
    });
  });
});

