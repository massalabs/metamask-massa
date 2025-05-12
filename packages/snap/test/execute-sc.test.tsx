import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { ExecuteSc } from '../src/components/ExecuteSc';
import { executeHelloBytecode } from './fixtures/executeHelloBytecode';
import { parseMas, strToBytes } from '@massalabs/massa-web3';

describe('deploy-sc', () => {
  const origin = 'Jest';

  it('should render ui', async () => {
    const { request } = await installSnap();

    const name = 'ElonMars';

    // very high fee so the tx is never processed. I know its dirty :(
    const fee = parseMas('1000000').toString();
    const params = {
      bytecode: Array.from(executeHelloBytecode),
      fee,
      datastore: [
        {
          key: Array.from(strToBytes('name_key')),
          value: Array.from(strToBytes(name)),
        },
      ],
    };
    const req = request({
      method: 'account.executeSC',
      origin,
      params,
    });

    const ui = (await req.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(<ExecuteSc fee={fee} maxCoins={'none'} />);

    // await ui.ok();
    // const res = await req;
    // expect(res).toRespondWith({
    //   operationId: expect.any(String),
    // });

    // const operation = new Operation(
    //   JsonRpcPublicProvider.buildnet(),
    //   (res as any).result.operationId,
    // );

    // const events = await operation.getSpeculativeEvents();
    // expect(events).toHaveLength(1);
    // expect(events[0]?.data).toBe('HelloWorld');
  });
});
