import type {
  RequestOptions,
  SnapConfirmationInterface,
  SnapRequest,
} from '@metamask/snaps-jest';

export const setNetwork = async (
  request: (opt: RequestOptions) => SnapRequest,
  url: string,
) => {
  const origin = 'Jest';
  const req = request({
    method: 'Provider.setNetwork',
    origin,
    params: {
      network: url,
    },
  });

  const ui = (await req.getInterface()) as SnapConfirmationInterface;
  await ui.ok();
  await new Promise((resolve) => setTimeout(resolve, 50));
};
