import type { Json, OnRpcRequestHandler } from '@metamask/snaps-sdk';

import type {
  SignMessageParams,
  TransferParams,
  CallSCParameters,
  SetNetworkParams,
  SellRollsParams,
  BuyRollsParams,
  ShowAccountCredentialsParams,
  AddTokenParams,
  DeleteTokenParams,
  GetTokensParams,
  GetOperationsParams,
  ClearOperationsParams,
  GetBalanceParams,
} from './handlers';
import {
  getBalance,
  transfer,
  signMessage,
  callSmartContract,
  getNetwork,
  setNetwork,
  getNodeUrls,
  sellRolls,
  buyRolls,
  showAccountCredentials,
  addToken,
  deleteToken,
  getTokens,
  getOperations,
  clearOperations,
  listAccounts,
} from './handlers';
import { getActiveAccount } from './handlers/get-active-account';
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
    case 'account.list':
      return listAccounts();
    case 'account.balance':
      return getBalance(request.params as unknown as GetBalanceParams);
    case 'account.sign':
      return signMessage(
        request.params as unknown as SignMessageParams,
      ) as unknown as Promise<Json>;
    case 'account.callSC':
      return callSmartContract(request.params as unknown as CallSCParameters);
    case 'account.sendTransaction':
      return transfer(request.params as unknown as TransferParams);
    case 'Provider.getNodeUrls':
      return getNodeUrls();
    case 'account.sellRolls':
      return sellRolls(request.params as unknown as SellRollsParams);
    case 'account.buyRolls':
      return buyRolls(request.params as unknown as BuyRollsParams);
    case 'Provider.getNetwork':
      return getNetwork();
    case 'Provider.setNetwork':
      return setNetwork(request.params as unknown as SetNetworkParams);
    case 'account.showCredentials':
      return showAccountCredentials(
        request.params as unknown as ShowAccountCredentialsParams,
      );
    case 'account.getActive':
      return getActiveAccount();
    case 'account.addToken':
      return addToken(request.params as unknown as AddTokenParams);
    case 'account.deleteToken':
      return deleteToken(request.params as unknown as DeleteTokenParams);
    case 'account.getTokens':
      return getTokens(request.params as unknown as GetTokensParams);
    case 'account.getOperations':
      return getOperations(request.params as unknown as GetOperationsParams);
    case 'account.clearOperations':
      return clearOperations(
        request.params as unknown as ClearOperationsParams,
      );
    default:
      throw new Error('Method not found.');
  }
};
