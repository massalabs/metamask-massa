import type { Json, OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import { MassaAccount } from './account';
import { signMessage, callSmartContract, getAddress, showSecretKey, SignMessageParams, transfer } from './handlers';
import { ICallData, ITransactionData } from '@massalabs/massa-web3';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  request,
}) => {
  switch (request.method) {
    case 'signMessage':
      return signMessage(request.params as unknown as SignMessageParams) as unknown as Promise<Json>;
    case 'callSmartContract':
      return callSmartContract(request.params as unknown as ICallData);
    case 'transfer':
      return transfer(request.params as unknown as ITransactionData);
    case 'getAddress':
      return getAddress();
    case 'showSecretKey':
      return showSecretKey();
    default:
      throw new Error('Method not found.');
  }
};
