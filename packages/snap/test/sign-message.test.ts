import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { ListAccountsResponse } from 'src/handlers';
import { generateAccounts } from './utils/generateAccounts';

describe('onRpcRequest', () => {
  describe('sign-message', () => {
    it('should sign a message', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';
      const response = await request({
        method: 'account.sign',
        origin,
        params: {
          address: "AU1251CN5cGD43yCwW2VAJPgDTCxcBnPJTRUyFS1DT5d7czraM8ho",
          data: [10, 0, 0, 0, 77, 121, 32, 77, 101, 115, 115, 97, 103, 101],
        }
      });
      console.log(response);
      expect(response).toEqual({ signature: '0x123' });
    });
  });
});

