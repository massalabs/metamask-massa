import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';
import { DEFAULT_NETWORK } from '../src/active-chain';
import { PublicApiUrl } from '@massalabs/massa-web3';
import { NETWORK } from './utils/constants';

describe('get-network', () => {
  const origin = 'Jest';

  it('should get the default network', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'Provider.getNetwork',
      origin,
    });

    expect(await response).toRespondWith(DEFAULT_NETWORK);
  });

  it('should get the url for the buildnet network', async () => {
    const { request } = await installSnap();

    await setNetwork(request, PublicApiUrl.Buildnet);
    const response = request({
      method: 'Provider.getNetwork',
      origin,
    });

    expect(await response).toRespondWith(NETWORK);
  });
});
