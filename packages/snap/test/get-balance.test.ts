import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import type { GetActiveAccountResponse } from '../src/handlers/get-active-account';

describe('get-balance', () => {
  const origin = 'Jest';

  it('should get the balance of an account', async () => {
    const { request } = await installSnap();

    const defaultAccount: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.balance',
      origin,
      params: {
        address: defaultAccount.address,
      },
    });

    expect(await response).toRespondWith({
      finalBalance: expect.any(String),
      candidateBalance: expect.any(String),
    });
  });

  it('should throw an error account when address is invalid', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'account.balance',
      origin,
      params: {
        address: 'AU00000000000000000000000000000000000000000000000000', // invalid address
      },
    });

    expect(await response).toRespondWithError({
      code: expect.any(Number),
      message: 'invalid address string: Non-base58 character',
      stack: expect.any(String),
    });
  });

  it('should throw an error when address is not a string', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'account.balance',
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
      method: 'account.balance',
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
