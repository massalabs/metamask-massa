import { panel, text } from '@metamask/snaps-sdk';
import type { Handler } from './handler';
import { getProvider } from '../accounts/provider';

export type SignMessageParams = {
  data: number[] | string;
};

export type SignMessageResponse = {
  signature: string;
  publicKey: string;
};

const validate = (params: SignMessageParams) => {
  if (!params.data) {
    throw new Error('No data provided');
  }
  if (!(Array.isArray(params.data) || typeof params.data === 'string')) {
    throw new Error('Invalid data type. Must be a Uint8Array or a string');
  }
};

/**
 * @description Signs a message with the given address using 'massa-web3'
 * @param params - The sign message parameters
 * @returns The signature and public key used to sign the message
 * @throws If the account is not found
 */
export const signMessage: Handler<
  SignMessageParams,
  SignMessageResponse
> = async (params) => {
  validate(params);
  const provider = await getProvider();

  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to sign the following message ?'),
        text(params.data.toString()),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied signing message');
  }

  return provider.sign(
    Array.isArray(params.data) ? Uint8Array.from(params.data) : params.data,
  );
};
