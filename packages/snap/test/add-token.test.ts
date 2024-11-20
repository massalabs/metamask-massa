import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import type { GetActiveAccountResponse } from 'src/handlers/get-active-account';

const tokens = ['AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm'];

describe('onRpcRequest', () => {
  describe('add-token', () => {
    it('should add a token for the default account', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const defaultAccount: GetActiveAccountResponse = (
        (await request({
          method: 'account.getActive',
          origin,
        })) as any
      ).response.result;

      const response = await request({
        method: 'account.addToken',
        origin,
        params: {
          //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          address: tokens[0]!,
        },
      });

      expect(response).toRespondWith({
        address: tokens[0],
        accountAddress: defaultAccount.address,
      });

      const getTokens = await request({
        method: 'account.getTokens',
        origin,
      });
      expect((getTokens.response as any).result.tokens).toEqual([tokens[0]]);
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
