import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';
import { BUILDNET, CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';
import { DEFAULT_MINIMAL_FEES } from '../src/active-chain';

describe('onRpcRequest', () => {
  describe('set-network', () => {
    it('should set the network to buildnet', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
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
    it('should set the network from default to buildnet', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
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
