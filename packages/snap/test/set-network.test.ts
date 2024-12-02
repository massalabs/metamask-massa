import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { NETWORK } from './utils/constants';
import { CHAIN_ID, NetworkName, PublicApiUrl } from '@massalabs/massa-web3';
import { DEFAULT_MINIMAL_FEES } from '../src/active-chain';
import { setNetwork } from './utils/setNetwork';

const origin = 'Jest';

describe('set-network', () => {
  it('should get default Network', async () => {
    const { request } = await installSnap();

    const response = request({
      method: 'Provider.getNetwork',
      origin,
    });

    expect(await response).toRespondWith({
      chainId: CHAIN_ID.Mainnet.toString(),
      networkName: NetworkName.Mainnet,
      rpcUrl: PublicApiUrl.Mainnet,
      minimalFees: DEFAULT_MINIMAL_FEES,
    });
  });

  it('should set the network to buildnet', async () => {
    const { request } = await installSnap();

    await setNetwork(request, PublicApiUrl.Buildnet);

    const response = request({
      method: 'Provider.getNetwork',
      origin,
    });

    expect(await response).toRespondWith(NETWORK);
  });
});
