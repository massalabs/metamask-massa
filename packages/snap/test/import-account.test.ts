import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

describe('onRpcRequest', () => {
  describe('import-account', () => {
    it('should generate an account with a given name', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: "P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d",
          privateKey: "S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL",
        }
      });

      expect(await response).toRespondWith({
        response: "OK",
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(2); // default account + added account
      expect((accountList.response as any).result[1]).toEqual({
        address: "AU12PsWbf4TC8jm2RkTLz1q63tcuTd1rxJFymy2pY6fTaYcdejvWy",
        name: expect.any(String),
      });
    });


    it('should throw an error account when publicKey is empty', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: "",
          privateKey: "S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL",
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: publicKey must be a string',
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(1); // default account
    });

    it('should throw an error when publicKey is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: 123,
          privateKey: "S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL",
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: publicKey must be a string',
       });
    });

    it('should throw an error when publicKey is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.import',
        origin,
        params: {
          privateKey: "S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL",
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: publicKey must be a string',
       });
    });

    it('should throw an error account when privateKey is empty', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: "P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d",
          privateKey: "",
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: privateKey must be a string',
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(1); // default account
    });

    it('should throw an error when privateKey is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: "P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d",
          privateKey: 123,
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: privateKey must be a string',
       });
    });

    it('should throw an error when privateKey is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = request({
        method: 'account.import',
        origin,
        params: {
          publicKey: "P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d"
        }
      });

      expect(await response).toRespondWith({
        response: "ERROR",
        message: 'Invalid params: privateKey must be a string',
       });
    });
  });
});

