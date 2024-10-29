import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { setNetwork } from './utils/setNetwork';

describe('onRpcRequest', () => {
  describe('get-node-url', () => {
    it('should get the url for the default network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'Provider.getNodeUrl',
        origin,
      });

      expect(await response).toRespondWith(
        'https://mainnet.massa.net/api/v2',
      );
    });

    it('should get the url for the buildnet network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'Provider.getNodeUrl',
        origin,
      });

      expect(await response).toRespondWith(
        'https://buildnet.massa.net/api/v2',
      );
    });
  });
});