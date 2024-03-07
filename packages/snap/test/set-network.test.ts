import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { ListAccountsResponse } from 'src/handlers';
import { setNetwork } from './utils/setNetwork';

describe('onRpcRequest', () => {
  describe('set-network', () => {
    it('should set the network to buildnet', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'Provider.getNetwork',
        origin,
      });


      expect(await response).toRespondWith({ network: "77658366" });
    });

    it('should set the network to mainnet from buildnet', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      await setNetwork(request, 77658377n); // MainNet
      const response = request({
        method: 'Provider.getNetwork',
        origin,
      });



      expect(await response).toRespondWith({ network: "77658377"});
    });
  });
});

