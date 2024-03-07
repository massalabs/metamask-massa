import { RequestOptions, SnapRequest } from "@metamask/snaps-jest";

export const setNetwork = async (request: (opt: RequestOptions) => SnapRequest, chainId: bigint) => {
  const origin = 'Jest';
  await request({
    method: 'Provider.setNetwork',
    origin,
    params: {
      network: chainId.toString()
    }
  });
}
