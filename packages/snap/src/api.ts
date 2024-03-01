import type {
  ITransactionData,
  INodeStatus,
  Web3Account,
} from '@massalabs/massa-web3';
import { ICallData, OperationTypeId, CHAIN_ID } from '@massalabs/massa-web3';

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

    const res = await RpcHandler.sendOperation(
      [[signedData]],
      'send_transaction',
    );
    return JSON.parse(res.text()).result;
  }

  static async sendOperation(data: object, operation: string): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      method: operation,
      params: data,
      id: 0,
    };

    return fetch('https://buildnet.massa.net/api/v2', {
      headers: requestHeaders,
      body: JSON.stringify(body),
      method: 'POST',
    });
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
    const json = (await res.json()) as unknown as { result: INodeStatus };
    return json.result;
  }
}
