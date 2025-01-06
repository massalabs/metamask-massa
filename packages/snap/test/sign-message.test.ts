import { expect } from '@jest/globals';
import type { SnapConfirmationInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text } from '@metamask/snaps-sdk';

describe('sign-message', () => {
  const origin = 'Jest';

  it('should sign a byte message', async () => {
    const { request } = await installSnap();

    const data = 'My Message';

    const response = request({
      method: 'account.sign',
      origin,
      params: {
        data: Array.from(new TextEncoder().encode(data)),
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      panel([
        text('Do you want to sign the following message ?'),
        text(new TextEncoder().encode(data).toString()),
      ]),
    );

    await ui.ok();
    expect(await response).toRespondWith({
      publicKey: 'P1EZLnAGanjtHBNx3LMMXCtqG6rEd3kBmSyr8UdzUW3foT2ahvK',
      signature:
        '1M8emRndyG5Qsj94CX2A4nGWuUVuzENFuBiC3NDvH75u5o3TonHHHEUgFJ3uJWkokGHEHJnN5UcNXSJTrKcHWESYKnqG4c',
    });
  });

  it('should sign a string message', async () => {
    const { request } = await installSnap();

    const data = 'My Message';

    const response = request({
      method: 'account.sign',
      origin,
      params: {
        data,
      },
    });

    const ui = (await response.getInterface()) as SnapConfirmationInterface;

    expect(ui.type).toBe('confirmation');
    expect(ui).toRender(
      panel([text('Do you want to sign the following message ?'), text(data)]),
    );

    await ui.ok();
    expect(await response).toRespondWith({
      publicKey: 'P1EZLnAGanjtHBNx3LMMXCtqG6rEd3kBmSyr8UdzUW3foT2ahvK',
      signature:
        '1M8emRndyG5Qsj94CX2A4nGWuUVuzENFuBiC3NDvH75u5o3TonHHHEUgFJ3uJWkokGHEHJnN5UcNXSJTrKcHWESYKnqG4c',
    });
  });
});
