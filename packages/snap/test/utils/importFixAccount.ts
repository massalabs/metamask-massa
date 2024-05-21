import { RequestOptions, SnapRequest } from '@metamask/snaps-jest';

export const importFixAccount = async (
  request: (opt: RequestOptions) => SnapRequest,
) => {
  const origin = 'Jest';

  try {
    await request({
      method: 'account.import',
      origin,
      params: {
        publicKey: 'P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d',
        privateKey: 'S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL',
      },
    });
  } catch (error) {
    console.log('Account already exists');
  }

  return {
    address: 'AU12PsWbf4TC8jm2RkTLz1q63tcuTd1rxJFymy2pY6fTaYcdejvWy',
    publicKey: 'P1k3dLQAY7s9hUQQooSRowYbsR9hz2Fs2MFwPSBfrzkFXDajs3d',
    privateKey: 'S12KivzzmdkmXUbs2fJBEK9eYL5P5gS7rqVkNvkkVUdoQRFVJgRL',
  };
};
