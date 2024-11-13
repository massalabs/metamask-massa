import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';

import { setNetwork } from './utils/setNetwork';
import { DefaultProviderUrls } from '@massalabs/massa-web3';
import { CallSc } from '../src/components/CallSc';

const baseParams = {
  fee: '1000000000000000',
  functionName: 'transfer',
  at: 'AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm', // USDC
  args: [
    53, 0, 0, 0, 65, 85, 49, 50, 80, 115, 87, 98, 102, 52, 84, 67, 56, 106, 109,
    50, 82, 107, 84, 76, 122, 49, 113, 54, 51, 116, 99, 117, 84, 100, 49, 114,
    120, 74, 70, 121, 109, 121, 50, 112, 89, 54, 102, 84, 97, 89, 99, 100, 101,
    106, 118, 87, 121, 0, 202, 154, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  coins: '0',
  maxGas: 10000000n.toString(),
};

describe('onRpcRequest', () => {
  describe('call-sc', () => {
    it('should return an operation id', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: baseParams,
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;

      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        <CallSc
          fee={'1000000000000000'}
          functionName={'transfer'}
          at={'AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm'}
          args={[
            53, 0, 0, 0, 65, 85, 49, 50, 80, 115, 87, 98, 102, 52, 84, 67, 56,
            106, 109, 50, 82, 107, 84, 76, 122, 49, 113, 54, 51, 116, 99, 117,
            84, 100, 49, 114, 120, 74, 70, 121, 109, 121, 50, 112, 89, 54, 102,
            84, 97, 89, 99, 100, 101, 106, 118, 87, 121, 0, 202, 154, 59, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0,
          ]}
          coins={'0'}
        />,
      );

      await ui.ok();
      expect(await response).toRespondWith({
        operationId: expect.any(String),
      });

      const operations = await request({
        method: 'account.getOperations',
        origin,
        params: {},
      });
      expect((operations.response as any).result.operations).toHaveLength(1);
    });

    it('should throw an error if the user deny the request', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: baseParams,
      });

      const ui = (await response.getInterface()) as SnapConfirmationInterface;
      expect(ui.type).toBe('confirmation');
      expect(ui).toRender(
        <CallSc
          fee={'1000000000000000'}
          functionName={'transfer'}
          at={'AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm'}
          args={[
            53, 0, 0, 0, 65, 85, 49, 50, 80, 115, 87, 98, 102, 52, 84, 67, 56,
            106, 109, 50, 82, 107, 84, 76, 122, 49, 113, 54, 51, 116, 99, 117,
            84, 100, 49, 114, 120, 74, 70, 121, 109, 121, 50, 112, 89, 54, 102,
            84, 97, 89, 99, 100, 101, 106, 118, 87, 121, 0, 202, 154, 59, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0,
          ]}
          coins={'0'}
        />,
      );

      await ui.cancel();
      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'User denied calling smart contract',
        stack: expect.any(String),
      });
    });

    it('should throw an error if the fee is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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

    it('should throw an error if the maxGas is not a string', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
          ...baseParams,
          maxGas: 1000000,
        },
      });

      expect(await response).toRespondWithError({
        code: expect.any(Number),
        message: 'Invalid params: maxGas must be a string',
        stack: expect.any(String),
      });
    });

    it('should throw an error if fee is missing', async () => {
      const { request } = await installSnap();
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
      const origin = 'Jest';

      await setNetwork(request, DefaultProviderUrls.BUILDNET); // BuildNet
      const response = request({
        method: 'account.callSC',
        origin,
        params: {
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
  });
});
