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
      publicKey: 'P12BYyRbBF72Ft1N87e5JaVg4Ua7LkmTGBSm6hhQC7M5L2KNJiSt',
      signature:
        '1R34YLo2jZUANsehSLddauxjgDhTQUr1MNnP6u3Q14V2Xg2ZHiVsqa5JqRvxjSgPjtSx8dFYrYTSb7ogM9vC8zNXDtC2gp',
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
      publicKey: 'P12BYyRbBF72Ft1N87e5JaVg4Ua7LkmTGBSm6hhQC7M5L2KNJiSt',
      signature:
        '1R34YLo2jZUANsehSLddauxjgDhTQUr1MNnP6u3Q14V2Xg2ZHiVsqa5JqRvxjSgPjtSx8dFYrYTSb7ogM9vC8zNXDtC2gp',
    });
  });
});
