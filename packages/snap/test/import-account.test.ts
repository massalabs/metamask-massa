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
        address: "AU12PsWbf4TC8jm2RkTLz1q63tcuTd1rxJFymy2pY6fTaYcdejvWy",
      });

      const accountList = await request({
        method: 'account.list',
        origin,
      });
      expect((accountList.response as any).result).toHaveLength(2); // default account + added account
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: publicKey must be a string',
        stack: expect.any(String),
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: publicKey must be a string',
        stack: expect.any(String),
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: publicKey must be a string',
        stack: expect.any(String),
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: privateKey must be a string',
        stack: expect.any(String),
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: privateKey must be a string',
        stack: expect.any(String),
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

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: privateKey must be a string',
        stack: expect.any(String),
       });
    });
  });
});

