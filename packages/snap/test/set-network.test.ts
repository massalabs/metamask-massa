import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';
import { CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';

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
        network: DefaultProviderUrls.BUILDNET,
        chainId: CHAIN_ID.BuildNet.toString(),
        minimalFees: '0.01',
      });
    });

    it('should set the network to mainnet from buildnet', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      await setNetwork(request, DefaultProviderUrls.MAINNET); // MainNet
      const response = request({
        method: 'Provider.getNetwork',
        origin,
      });

      expect(await response).toRespondWith({
        network: DefaultProviderUrls.MAINNET,
        chainId: CHAIN_ID.MainNet.toString(),
        minimalFees: '0.01',
      });
    });
  });
});
