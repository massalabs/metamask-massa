import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { TOKEN } from './utils/constants';

const origin = 'Jest';

describe('add-token', () => {
  it('should add a token for the default account', async () => {
    const { request } = await installSnap();
    const response = await request({
      method: 'account.addToken',
      origin,
      params: {
        address: TOKEN,
      },
    });

    expect(response).toRespondWith({ response: 'OK' });

    const getTokens = await request({
      method: 'account.getTokens',
      origin,
    });
    expect((getTokens.response as any).result.tokens).toEqual([TOKEN]);
  });

  it('should throw an error when address is not a string', async () => {
    const { request } = await installSnap();

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
