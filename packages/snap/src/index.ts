import type { ITransactionData } from '@massalabs/massa-web3';
import type { Json, OnRpcRequestHandler } from '@metamask/snaps-sdk';

import type { GetBalanceParams, SignMessageParams, TransferParams, ImportAccountParams, CallSCParameters, GenerateAccountParams, SetActiveAccountParams, SetNetworkParams, SellRollsParams, BuyRollsParams, ShowAccountCredentialsParams } from './handlers';
import { getBalance, listAccounts, signMessage, transfer, callSmartContract, importAccount, generateAccount, getActiveAccount, setActiveAccount, getNetwork, setNetwork, getNodeUrls, sellRolls, buyRolls, showAccountCredentials } from './handlers';

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
      return getBalance(request.params as GetBalanceParams);
    case 'account.import':
      return importAccount(request.params as unknown as ImportAccountParams);
    case 'account.sign':
      return signMessage(request.params as unknown as SignMessageParams) as unknown as Promise<Json>;
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
    case 'account.generateNewAccount':
      return generateAccount(request.params as unknown as GenerateAccountParams);
    case 'account.setActive':
      return setActiveAccount(request.params as unknown as SetActiveAccountParams);
    case 'account.getActive':
      return getActiveAccount();
    case 'Provider.getNetwork':
      return getNetwork();
    case 'Provider.setNetwork':
      return setNetwork(request.params as unknown as SetNetworkParams);

    case 'account.showCredentials':
      return showAccountCredentials(request.params as unknown as ShowAccountCredentialsParams);
    default:
      throw new Error('Method not found.');
  }
};
