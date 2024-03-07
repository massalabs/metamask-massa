import { panel, text } from '@metamask/snaps-sdk';

import { getClientWallet } from '../accounts/clients';
import { getNetwork } from './get-network';
import type { Handler } from './handler';

export type SignMessageParams = {
  address: string;
  data: number[];
};

export type SignMessageResponse = {
  signature: number[];
  publicKey: string;
};

const coerceParams = (params: SignMessageParams): SignMessageParams => {
  if (!params.data || !params.address) {
    throw new Error('Data and chainId are required');
  } else if (!Array.isArray(params.data)) {
    throw new Error('Data must be an array');
  } else if (typeof params.address !== 'string') {
    throw new Error('Address must be a string');
  }

  return params;
};

export const signMessage: Handler<
  SignMessageParams,
  SignMessageResponse
> = async (params) => {
  const { data, address } = coerceParams(params);
  const wallet = await getClientWallet(address);

  if (!wallet) {
    throw new Error(`Account not found: ${address}`);
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
  console.log(
    'Signing message',
    data,
    'with address',
    address,
    'and chainId',
    chainId,
  );
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
