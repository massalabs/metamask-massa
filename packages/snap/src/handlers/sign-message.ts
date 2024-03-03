import { MassaAccount } from "../account";
import { Handler } from "./handler";
import { Args, ISignature } from "@massalabs/massa-web3";
import { panel, text } from "@metamask/snaps-sdk";

export type SignMessageParams = {
  data: string | Buffer;
  chainId: string;
};

type SignMessageInternalParams = {
  data: string | Buffer;
  chainId: bigint;
};

export type SignMessageResponse = {
  signature: number[];
  publicKey: string;
};

const coerceParams = (params: SignMessageParams): SignMessageInternalParams => {
  if (!params.data || !params.chainId) {
    throw new Error('Data and chainId are required');
  } else if (typeof params.data !== 'string' && !Buffer.isBuffer(params.data)) {
    throw new Error('Data must be a string or Buffer');
  } else if (typeof params.chainId !== 'string') {
    throw new Error('ChainId must be a string');
  }
  return {
    data: params.data,
    chainId: BigInt(params.chainId),
  };
}


export const signMessage: Handler<SignMessageParams, SignMessageResponse> = async (params) => {
  const wallet = await MassaAccount.getWalletClient();
  const address = (await MassaAccount.getAccount()).address!;
  const { data, chainId } = coerceParams(params);
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

  const sig = await wallet.signMessage(data, chainId, address);
  return {
    signature: sig.base58Encoded.split('').map((c) => c.charCodeAt(0)),
    publicKey: sig.publicKey,
  }
};
