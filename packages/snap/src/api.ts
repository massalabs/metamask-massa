import type {
  ITransactionData,
  INodeStatus,
  Web3Account,
} from '@massalabs/massa-web3';
import { ICallData, OperationTypeId, CHAIN_ID } from '@massalabs/massa-web3';
import { panel, text } from '@metamask/snaps-sdk';

import { MassaAccount } from './account';
import { Encoder } from './encoder';

const requestHeaders: [string, string][] = [
  [
    'Accept',
    'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*!!!!!!!!/*;q=0.8',
  ],
  ['Content-Type', 'application/json'],
];

export class RpcHandler {
  static async sendTransaction(data: ITransactionData) {
    const baseAccount = (
      await MassaAccount.getWalletClient()
    ).getBaseAccount() as Web3Account;

    const publicKey = (await MassaAccount.getAccount()).publicKey ?? '';

    const compactData = await Encoder.compactToBytes(
      data,
      OperationTypeId.Transaction,
      baseAccount,
    );
    const signedData = await Encoder.signData(
      baseAccount,
      publicKey,
      compactData,
      BigInt(CHAIN_ID.BuildNet),
    );

    return RpcHandler.sendOperation(
      [[signedData]],
      'send_operations',
    );
  }

  static async sendOperation(data: object, operation: string): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      method: operation,
      params: data,
      id: 0,
    };

    const res = await fetch('https://buildnet.massa.net/api/v2', {
      headers: requestHeaders,
      body: JSON.stringify(body),
      method: 'POST',
    });
    const json = (await res.json()) as unknown as { result: any; error: any };

    if (json.error) {
      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text('Operation error: '),
            text(JSON.stringify(json.error)),
          ]),
        },
      });
      throw new Error(json.error.message);
    }

    return json.result;
  }

  public static async getNodeStatus() {
    const body = {
      jsonrpc: '2.0',
      method: 'get_status',
      params: null,
      id: 0,
    };

    const res = await fetch('https://buildnet.massa.net/api/v2', {
      headers: requestHeaders,
      body: JSON.stringify(body),
      method: 'POST',
    });
    const json = (await res.json()) as unknown as { result: INodeStatus, error: any };
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  }
}
