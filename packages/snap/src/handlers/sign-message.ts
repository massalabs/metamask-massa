import { panel, text } from '@metamask/snaps-sdk';

import { getClientWallet } from '../accounts/clients';
import { getNetwork } from './get-network';
import type { Handler } from './handler';
import { getHDAccount } from '../accounts/hd-deriver';

export type SignMessageParams = {
  data: number[];
};

export type SignMessageResponse = {
  signature: number[];
  publicKey: string;
};

/**
 * @description Coerce the sign message parameters by ensuring the parameters are present and are the correct type
 * @param params - The sign message parameters
 * @returns The sign message parameters
 */
const coerceParams = (params: SignMessageParams): SignMessageParams => {
  if (!params.data) {
    throw new Error('Data to sign is required!');
  } else if (!Array.isArray(params.data)) {
    throw new Error('Data must be an array!');
  }

  return params;
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
  const { data } = coerceParams(params);
  const wallet = await getClientWallet();
  const address = (await getHDAccount()).address;

  if (!wallet || !address) {
    throw new Error(`Not logged in to metamask. Please log in and try again.`);
  }

  const { network: chainId } = await getNetwork();
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text('Do you want to sign the following message ?'),
        text(data.toString()),
      ]),
    },
  });

  if (!confirm) {
    throw new Error('User denied signing message');
  }

  const sig = await wallet.signMessage(
    Buffer.from(data),
    BigInt(chainId),
    address,
  );
  return {
    signature: sig.base58Encoded.split('').map((c) => c.charCodeAt(0)),
    publicKey: sig.publicKey,
  };
};
