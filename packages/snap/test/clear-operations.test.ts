import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';

import { Account } from '@massalabs/massa-web3';

describe('clear-operations', () => {
  const origin = 'Jest';

  it('should clear operations for account', async () => {
    const { request } = await installSnap();
    const { address } = await Account.generate();

    const response = request({
      method: 'account.sendTransaction',
      origin,
      params: {
        recipientAddress: address.toString(),
        fee: '1000000000000000',
        amount: '1000000000000000',
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    await ui.ok();
    await response;

    const operations = await request({
      method: 'account.getOperations',
      origin,
    });
    expect((operations.response as any).result.operations).toHaveLength(1);

    const clearResponse = request({
      method: 'account.clearOperations',
      origin,
    });
    expect(await clearResponse).toRespondWith({
      response: 'OK',
    });

    const operationsAfterClear = await request({
      method: 'account.getOperations',
      origin,
    });
    expect(
      (operationsAfterClear.response as any).result.operations,
    ).toHaveLength(0);
  });
});
