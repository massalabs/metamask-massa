import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { ListAccountsResponse } from 'src/handlers';
import { setNetwork } from './utils/setNetwork';

describe('onRpcRequest', () => {
  describe('get-node-urls', () => {
    it('should get the urls for the default network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'Provider.getNodeUrls',
        origin,
      });


      expect(await response).toRespondWith(["https://massa.net/api/v2"]);
    });

    it('should get the urls for the buildnet network', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'Provider.getNodeUrls',
        origin,
      });


      expect(await response).toRespondWith(["https://buildnet.massa.net/api/v2"]);
    });
  });
});

