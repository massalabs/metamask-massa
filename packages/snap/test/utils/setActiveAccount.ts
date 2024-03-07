import { RequestOptions, SnapRequest } from "@metamask/snaps-jest";

export const setActiveAccount = async (request: (opt: RequestOptions) => SnapRequest, address: string) => {
  const origin = 'Jest';
  await request({
    method: 'account.setActive',
    origin,
    params: {
      address
    }
  });
}
