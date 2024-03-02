import type { ITransactionData } from '@massalabs/massa-web3';
import type { Json, OnRpcRequestHandler } from '@metamask/snaps-sdk';

import { type CallSCParameters } from './dto';
import type { SignMessageParams } from './handlers';
import {
  signMessage,
  callSmartContract,
  getAddress,
  showSecretKey,
  transfer,
} from './handlers';

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
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'signMessage':
      return signMessage(
        request.params as unknown as SignMessageParams,
      ) as unknown as Promise<Json>;
    case 'callSmartContract':
      return callSmartContract(request.params as unknown as CallSCParameters);
    case 'transfer':
      return transfer(request.params as unknown as ITransactionData);
    case 'getAddress':
      return getAddress();
    case 'showSecretKey':
      return showSecretKey();
    case 'account.list':
      return '';
    case 'account.balance':
      return '';
    case 'account.import':
      return {
        response: 'ERROR',
        message:
          'Cannot import an account in metamask. Please create a new account on metamask',
      };
    case 'account.sign':
      return '';
    case 'account.callSC':
      return '';
    case 'account.sendTransaction':
      return '';
    case 'Provider.getNodeUrl':
      return '';
    default:
      throw new Error('Method not found.');
  }
};
