import type { RequestOptions, SnapRequest } from '@metamask/snaps-jest';

export const setNetwork = async (
  request: (opt: RequestOptions) => SnapRequest,
  url: string,
) => {
  const origin = 'Jest';
  await request({
    method: 'Provider.setNetwork',
    origin,
    params: {
      network: url,
    },
  });
};
