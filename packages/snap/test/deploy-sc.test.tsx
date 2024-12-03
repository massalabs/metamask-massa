import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { DeploySc } from '../src/components/DeploySc';

const baseParams = {
  bytecode: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  fee: '1000000000000000',
};

describe('deploy-sc', () => {
  const origin = 'Jest';

  it('should render ui', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'account.deploySC',
      origin,
      params: baseParams,
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      <DeploySc
        fee={'1000000000000000'}
        maxCoins={'none'}
        args={[]}
        coins={'0'}
      />,
    );
  });
});
