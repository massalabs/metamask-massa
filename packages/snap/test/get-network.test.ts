import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';
import { BUILDNET, CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';
import { DEFAULT_MINIMAL_FEES, DEFAULT_NETWORK } from '../src/active-chain';

describe('onRpcRequest', () => {
  describe('get-network', () => {
    it('should get the default network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'Provider.getNetwork',
        origin,
      });

      expect(await response).toRespondWith(DEFAULT_NETWORK);
    });

    it('should get the url for the buildnet network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET);
      const response = request({
        method: 'Provider.getNetwork',
        origin,
      });

      expect(await response).toRespondWith({
        rpcUrl: DefaultProviderUrls.BUILDNET,
        chainId: CHAIN_ID.BuildNet.toString(),
        networkName: BUILDNET,
        minimalFees: DEFAULT_MINIMAL_FEES,
      });
    });
  });
});
