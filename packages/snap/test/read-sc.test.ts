import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { setNetwork } from './utils/setNetwork';
import { Args, PublicApiUrl, U256 } from '@massalabs/massa-web3';

describe('read-sc', () => {
  const origin = 'Jest';

  it('should call readSC', async () => {
    const { request } = await installSnap();

    const baseParams = {
      fee: '100000000',
      functionName: 'balanceOf',
      at: 'AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm', // USDC
      args: Array.from(
        new Args()
          .addString('AU1WicgfU4Y6s4KvSJW6U8gLK7WGscKLX4Q5RipXVDnbkWbMQC75')
          .serialize(),
      ),
      coins: '0',
      maxGas: 10000000n.toString(),
    };

    await setNetwork(request, PublicApiUrl.Buildnet);
    const response = request({
      method: 'account.readSC',
      origin,
      params: baseParams,
    });

    expect(await response).toRespondWith({
      data: Array.from(U256.toBytes(0n)),
      infos: { gasCost: 2100000 },
    });
  });
});
