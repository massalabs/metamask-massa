import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';

import type { GetActiveAccountResponse } from '../src/handlers/get-active-account';

describe('transfer', () => {
  const origin = 'Jest';

  it('should return an operation id', async () => {
    const { request } = await installSnap();
    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        fee: '1000000000000000',
        amount: '1000000000000000',
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      panel([
        text('**Do you want to send the following transaction?**'),
        text(`**Recipient:** ${account.address}`),
        text('**Amount:** 1000000 MAS'),
        text('**Fee:** 1000000 MAS'),
      ]),
    );

    await ui.ok();
    expect(await response).toRespondWith({
      operationId: expect.any(String),
    });

    const operations = await request({
      method: 'account.getOperations',
      origin,
    });
    expect((operations.response as any).result.operations).toHaveLength(1);
  });

  it('should return an operation id (fee missing)', async () => {
    const { request } = await installSnap();
    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        amount: '1000000000000000',
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      panel([
        text('**Do you want to send the following transaction?**'),
        text(`**Recipient:** ${account.address}`),
        text('**Amount:** 1000000 MAS'),
        text('**Fee:** 0.01 MAS'),
      ]),
    );

    await ui.ok();
    expect(await response).toRespondWith({
      operationId: expect.any(String),
    });

    const operations = await request({
      method: 'account.getOperations',
      origin,
    });
    expect((operations.response as any).result.operations).toHaveLength(1);
  });

  it('should throw an error if the user deny the request', async () => {
    const { request } = await installSnap();
    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        fee: '1000000000000000',
        amount: '1000000000000000',
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;
    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      panel([
        text('**Do you want to send the following transaction?**'),
        text(`**Recipient:** ${account.address}`),
        text('**Amount:** 1000000 MAS'),
        text('**Fee:** 1000000 MAS'),
      ]),
    );

    await ui.cancel();
    expect(await response).toRespondWithError({
      code: -32603,
      message: 'User denied sending transaction',
      stack: expect.any(String),
    });
  });

  it('should throw an error if the fee is not a string', async () => {
    const { request } = await installSnap();
    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        fee: 1000000,
        amount: '1000000000000000',
      },
    });

    expect(await response).toRespondWithError({
      code: -32603,
      message: 'Invalid params: fee must be a string',
      stack: expect.any(String),
    });
  });

  it('should throw an error if the amount is not a string', async () => {
    const { request } = await installSnap();

    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        fee: '1000000000000000',
        amount: 1000000,
      },
    });

    expect(await response).toRespondWithError({
      code: -32603,
      message: 'Invalid params: amount must be a string',
      stack: expect.any(String),
    });
  });

  it('should throw an error if the recipientAddress is not a string', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: 123,
        fee: '1000000000000000',
        amount: '1000000000000000',
      },
    });

    expect(await response).toRespondWithError({
      code: -32603,
      message: 'Invalid params: recipientAddress must be a string',
      stack: expect.any(String),
    });
  });

  it('should throw an error if the amount is missing', async () => {
    const { request } = await installSnap();

    const account: GetActiveAccountResponse = (
      (await request({
        method: 'account.getActive',
        origin,
      })) as any
    ).response.result;

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: account.address,
        fee: '1000000000000000',
      },
    });

    expect(await response).toRespondWithError({
      code: -32603,
      message: 'Invalid params: amount must be a string',
      stack: expect.any(String),
    });
  });

  it('should throw an error if the recipientAddress is missing', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        fee: '1000000000000000',
        amount: '1000000000000000',
      },
    });

    expect(await response).toRespondWithError({
      code: -32603,
      message: 'Invalid params: recipientAddress must be a string',
      stack: expect.any(String),
    });
  });
});
