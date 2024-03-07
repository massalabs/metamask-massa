import { RequestOptions, SnapRequest } from "@metamask/snaps-jest";

export const addTokens = async (request: (opt: RequestOptions) => SnapRequest, tokens: string[], account?: string) => {
  const origin = 'Jest';
  return Promise.all(tokens.map(async (token, i) => {
    const res = await request({
      method: 'account.addToken',
      origin,
      params: {
        address: token,
        ...(account && { accountAddress: account })
      }
    });
    return (res.response as any).result;
  }));
}
