/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-globals */
import type {
  ITransactionData,
  ICallData,
  INodeStatus,
  Web3Account,
  ISignature,
} from '@massalabs/massa-web3';
import { OperationTypeId, utils } from '@massalabs/massa-web3';

import { RpcHandler } from './api';
import { Address } from '../utils';

export class Encoder {
  public static async signData(
    account: Web3Account,
    publicKey: string,
    bytesCompact: Buffer,
    chainId: bigint,
  ) {
    const signature: ISignature = await account.sign(
      this.getOperationBufferToSign(
        chainId,
        utils.bytes.getBytesPublicKey(publicKey),
        bytesCompact,
      ),
    );

    return {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: publicKey,
      signature: signature.base58Encoded,
    };
  }

  static getOperationBufferToSign(
    chainId: bigint,
    bytesPublicKey: Uint8Array,
    bytesCompact: Buffer,
  ): Buffer {
    // Chain id is an 64-bit unsigned integer, convert to byte array (big endian)
    const chainIdBuffer = new ArrayBuffer(8);
    const view = new DataView(chainIdBuffer);
    view.setBigUint64(0, chainId, false);

    return Buffer.concat([
      Buffer.from(chainIdBuffer),
      Buffer.from(bytesPublicKey),
      bytesCompact,
    ]);
  }

  private static async getBaseDataToCompact(
    data: ITransactionData | ICallData,
    operation: OperationTypeId,
    baseAccount: Web3Account,
  ) {
    const status: INodeStatus = await RpcHandler.getNodeStatus();

    const expiryPeriod: number =
      status.next_slot.period + (baseAccount.clientConfig.periodOffset ?? 0);

    const feeEncoded = Buffer.from(utils.crypto.varintEncode(data.fee));
    const expirePeriodEncoded = Buffer.from(
      utils.crypto.varintEncode(expiryPeriod),
    );
    const typeIdEncoded = Buffer.from(
      utils.crypto.varintEncode(operation.valueOf()),
    );
    return { feeEncoded, expirePeriodEncoded, typeIdEncoded };
  }

  public static async compactToBytes(
    data: ITransactionData | ICallData,
    operation: OperationTypeId,
    baseAccount: Web3Account,
  ) {
    const { feeEncoded, expirePeriodEncoded, typeIdEncoded } =
      await this.getBaseDataToCompact(data, operation, baseAccount);

    switch (operation) {
      case OperationTypeId.Transaction: {
        const txData = data as ITransactionData;
        const transferAmountEncoded = Buffer.from(
          utils.crypto.varintEncode(txData.amount),
        );
        const recipientAddressEncoded = new Address(
          txData.recipientAddress,
        ).toBytes();
        return Buffer.concat([
          feeEncoded,
          expirePeriodEncoded,
          typeIdEncoded,
          recipientAddressEncoded,
          transferAmountEncoded,
        ]);
      }
      default:
        throw new Error('Operation not supported');
    }
  }
}
