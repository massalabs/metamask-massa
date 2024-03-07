import { expect } from '@jest/globals';
import { SnapConfirmationInterface, installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { importFixAccount } from './utils/importFixAccount';
import { panel, text } from '@metamask/snaps-sdk';
import { setActiveAccount } from './utils/setActiveAccount';
import { generateAccounts } from './utils/generateAccounts';

const baseParams = {
  fee: '1000000000000000',
  functionName: 'transfer',
  at: "AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm", // USDC
  args: [53, 0, 0, 0, 65, 85, 49, 50, 80, 115, 87, 98, 102, 52, 84, 67, 56, 106, 109, 50, 82, 107, 84, 76, 122, 49, 113, 54, 51, 116, 99, 117, 84, 100, 49, 114, 120, 74, 70, 121, 109, 121, 50, 112, 89, 54, 102, 84, 97, 89, 99, 100, 101, 106, 118, 87, 121, 0, 202, 154, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  coins: '0',
  nonPersistentExecution: {
    maxGas: (10000000n).toString(),
  }
};

describe('onRpcRequest', () => {
  describe('call-sc', () => {
    it('should return an operation id', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
        },
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('Do you want to call the following smart contract?'),
          text(`**Conttract:** AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm`),
          text(`**Function:** transfer`),
          text(`**Fee:** 1000000000000000`),
          text(`**args:** [53,0,0,0,65,85,49,50,80,115,87,98,102,52,84,67,56,106,109,50,82,107,84,76,122,49,113,54,51,116,99,117,84,100,49,114,120,74,70,121,109,121,50,112,89,54,102,84,97,89,99,100,101,106,118,87,121,0,202,154,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`),
          text(`**coins:** 0`),
        ]),
      );

      await ui.ok();
      expect(await response).toRespondWith({
        operationId: expect.any(String),
      });

      const operations = await request({
        method: 'account.getOperations',
        origin,
        params: {
          address: accounts[0].address,
        },
      });
      expect((operations.response as any).result.operations).toHaveLength(1);
    });

    it('should throw an error if the user deny the request', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
        },
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        panel([
          text('Do you want to call the following smart contract?'),
          text(`**Conttract:** AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm`),
          text(`**Function:** transfer`),
          text(`**Fee:** 1000000000000000`),
          text(`**args:** [53,0,0,0,65,85,49,50,80,115,87,98,102,52,84,67,56,106,109,50,82,107,84,76,122,49,113,54,51,116,99,117,84,100,49,114,120,74,70,121,109,121,50,112,89,54,102,84,97,89,99,100,101,106,118,87,121,0,202,154,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`),
          text(`**coins:** 0`),
        ]),
      );

      await ui.cancel();
      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'User denied calling smart contract',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the nickname is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: 123,
          ...baseParams,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: nickname must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          fee: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: fee must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the coins is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          coins: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: coins must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the functionName is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          functionName: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: functionName must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the at is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          at: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: at must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the args is not an array', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          args: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: args must be an array',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the nonPersistentExecution.maxGas is not a string', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          nonPersistentExecution: {
            isNPE: true,
            maxGas: 1000000,
          },
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: maxGas must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if nickname is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          ...baseParams,
          nickname: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: nickname must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if fee is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          fee: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: fee must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if functionName is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          functionName: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: functionName must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if at is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          at: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: at must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if args is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          args: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: args must be an array',
        stack: expect.any(String),
      });
    });

    it('should throw an error if coins is missing', async () => {
      const { request } = await installSnap();
      const accounts = await generateAccounts(request, 2);
      const origin = 'Jest';

      await setNetwork(request, 77658366n); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          nickname: accounts[0].name,
          ...baseParams,
          coins: null,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: coins must be a string',
        stack: expect.any(String),
      });
    });
  });
});
