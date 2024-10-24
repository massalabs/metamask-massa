import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import type { ListAccountsResponse } from 'src/handlers';

const tokens = ['AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm'];

describe('onRpcRequest', () => {
  describe('add-token', () => {
    it('should add a token for the default account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const accountList: ListAccountsResponse = (
        (await request({
          method: 'account.list',
          origin,
        })) as any
      ).response.result;
      const defaultAccount = accountList[0]!;

      const response = request({
        method: 'account.addToken',
        origin,
        params: {
          address: tokens[0]!,
        },
      });

      expect(await response).toRespondWith({
        address: tokens[0],
        accountAddress: defaultAccount.address,
      });

      const getTokens = await request({
        method: 'account.getTokens',
        origin,
      });
      expect(((await getTokens).response as any).result.tokens).toEqual([
        tokens[0],
      ]);
    });

    it('should throw an error when address is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.addToken',
        origin,
        params: {
          address: 123,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: address must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error when address is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.addToken',
        origin,
        params: {},
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: address must be a string',
        stack: expect.any(String),
      });
    });
  });
});
