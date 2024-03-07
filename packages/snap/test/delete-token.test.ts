import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';
import { ListAccountsResponse } from 'src/handlers';
import { generateAccounts } from './utils/generateAccounts';
import { addTokens } from './utils/addTokens';

const tokens = [
  "AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm"
]

describe('onRpcRequest', () => {
  describe('delete-token', () => {
    it('should delete a token for the default account', async () => {
      const { request } = await installSnap();
      await addTokens(request, tokens);
      const origin = 'Jest';
      const accountList: ListAccountsResponse = ((await request({
        method: 'account.list',
        origin
      })) as any).response.result;
      const defaultAccount = accountList[0]!;

      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: tokens[0]!
        }
      });

      expect(await response).toRespondWith({
        response: "OK"
      });

      const getTokens = await request({
        method: 'account.getTokens',
        origin,
      });
      expect(((await getTokens).response as any).result.tokens).toHaveLength(0);
    });

    it('should delete a token for a specific account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accounts = await generateAccounts(request, 2);
      const account = accounts[1]!;
      await addTokens(request, tokens, account.address);

      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: tokens[0]!,
          accountAddress: account.address
        }
      });

      expect(await response).toRespondWith({
        response: "OK"
      });
      const getTokens = await request({
        method: 'account.getTokens',
        origin,
        params: {
          address: account.address
        }
      });
      expect(((await getTokens).response as any).result.tokens).toHaveLength(0);
    });

    it('should return an error when the token does not exist', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await addTokens(request, tokens);
      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: "AS00000000000000000000000000000000000000000000000000"
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: "Token not found"
      })
    });

    it('should throw an error when address is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: 123
        }
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: address must be a string',
        stack: expect.any(String),
       });
    });

    it('should throw an error when accountAddress is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: tokens[0]!,
          accountAddress: 123
        }
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: accountAddress must be a string',
        stack: expect.any(String),
       });
    });

    it('should throw an error when address is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {}
      });

      expect(await response).toRespondWithError({
        code: -32603,
        message: 'Invalid params: address must be a string',
        stack: expect.any(String),
       });
    });
  });
});

