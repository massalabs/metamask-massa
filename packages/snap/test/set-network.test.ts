import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';
import { DefaultProviderUrls } from '@massalabs/massa-web3';

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
        network: 'https://buildnet.massa.net/api/v2',
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
        network: 'https://mainnet.massa.net/api/v2',
      });
    });
  });
});
