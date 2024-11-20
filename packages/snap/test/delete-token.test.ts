import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { addTokens } from './utils/addTokens';
import type { GetActiveAccountResponse } from 'src/handlers/get-active-account';

const tokens = ['AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm'];

describe('onRpcRequest', () => {
  describe('delete-token', () => {
    it('should delete a token for the account', async () => {
      const { request } = await installSnap();
      await addTokens(request, tokens);
      const origin = 'Jest';

      const defaultAccount: GetActiveAccountResponse = (
        (await request({
          method: 'account.getActive',
          origin,
        })) as any
      ).response.result;

      expect(defaultAccount).toBeDefined();

      const response = await request({
        method: 'account.deleteToken',
        origin,
        params: {
          //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          address: tokens[0]!,
        },
      });

      expect(response).toRespondWith({
        response: 'OK',
      });

      const getTokens = await request({
        method: 'account.getTokens',
        origin,
      });
      expect((getTokens.response as any).result.tokens).toHaveLength(0);
    });

    it('should return an error when the token does not exist', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await addTokens(request, tokens);
      const response = request({
        method: 'account.deleteToken',
        origin,
        params: {
          address: 'AS00000000000000000000000000000000000000000000000000',
        },
      });

      expect(await response).toRespondWith({
        response: 'ERROR',
        message: 'Token not found',
      });
    });

    it('should throw an error when address is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.deleteToken',
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
        method: 'account.deleteToken',
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
