import { RequestOptions, SnapRequest } from '@metamask/snaps-jest';

export const generateAccounts = async (
  request: (opt: RequestOptions) => SnapRequest,
  number = 2,
) => {
  const accounts = [];
  const origin = 'Jest';
  for (let i = 0; i < number; i++) {
    const response = await request({
      method: 'account.generateNewAccount',
      origin,
      params: {
        name: `Account ${i + 1}`,
      },
    });
    if ((response.response as any).result) {
      accounts.push((response.response as any).result);
    }
  }
  return accounts;
};
