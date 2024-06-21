import { RequestOptions, SnapRequest } from '@metamask/snaps-jest';

export const addTokens = async (
  request: (opt: RequestOptions) => SnapRequest,
  tokens: string[],
) => {
  const origin = 'Jest';
  return Promise.all(
    tokens.map(async (token) => {
      const res = await request({
        method: 'account.addToken',
        origin,
        params: {
          address: token,
        },
      });
      return (res.response as any).result;
    }),
  );
};
