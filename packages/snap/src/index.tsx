import {
  assert,
  OnHomePageHandler,
  OnUserInputHandler,
  UserInputEventType,
  type OnRpcRequestHandler,
} from '@metamask/snaps-sdk';

import type {
  SignMessageParams,
  TransferParams,
  CallSCParameters,
  ReadSCParameters,
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
  readSmartContract,
  getNetwork,
  setNetwork,
  sellRolls,
  buyRolls,
  showAccountCredentials,
  addToken,
  deleteToken,
  getTokens,
  getOperations,
  clearOperations,
} from './handlers';
import { getActiveAccount } from './handlers/get-active-account';

import { showKeysConfirmation, showKeys } from './components';
import { HomePage } from './components/HomePage';
import { Mas, NetworkName, PublicApiUrl } from '@massalabs/massa-web3';
import { getProvider } from './accounts/provider';
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
    case 'account.balance':
      return getBalance(request.params as GetBalanceParams);
    case 'account.sign':
      return signMessage(request.params as SignMessageParams);
    case 'account.callSC':
      return callSmartContract(request.params as CallSCParameters);
    case 'account.readSC':
      return readSmartContract(request.params as ReadSCParameters);
    case 'account.sendTransaction':
      return transfer(request.params as TransferParams);
    case 'account.sellRolls':
      return sellRolls(request.params as SellRollsParams);
    case 'account.buyRolls':
      return buyRolls(request.params as BuyRollsParams);
    case 'Provider.getNetwork':
      return getNetwork();
    case 'Provider.setNetwork':
      return setNetwork(request.params as SetNetworkParams);
    case 'account.showCredentials':
      return showAccountCredentials(
        request.params as ShowAccountCredentialsParams,
      );
    case 'account.getActive':
      return getActiveAccount();
    case 'account.addToken':
      return addToken(request.params as AddTokenParams);
    case 'account.deleteToken':
      return deleteToken(request.params as DeleteTokenParams);
    case 'account.getTokens':
      return getTokens(request.params as GetTokensParams);
    case 'account.getOperations':
      return getOperations(request.params as GetOperationsParams);
    case 'account.clearOperations':
      return clearOperations(request.params as ClearOperationsParams);
    default:
      throw new Error('Method not found.');
  }
};

/**
 * Handle incoming home page requests from the MetaMask clients.
 *
 * @returns A static panel rendered with custom UI.
 * @see https://docs.metamask.io/snaps/reference/exports/#onhomepage
 */
export const onHomePage: OnHomePageHandler = async () => {
  const networkInfo = await getNetwork();
  const provider = await getProvider();
  const address = provider.address;
  const balance = await provider.balance(false);

  return {
    content: (
      <HomePage
        networkInfo={networkInfo}
        address={address}
        balance={Mas.toString(balance)}
      />
    ),
  };
};

/**
 * Handle incoming user events coming from the Snap interface.
 *
 * @param params - The event parameters.
 * @param params.id - The Snap interface ID where the event was fired.
 * @param params.event - The event object containing the event type, name and
 * value.
 * @see https://docs.metamask.io/snaps/reference/exports/#onuserinput
 */
export const onUserInput: OnUserInputHandler = async ({ event, id }) => {
  switch (event.name) {
    case 'show-keys-validation':
      await showKeysConfirmation();
      break;
    case 'show-keys':
      await showKeys(id);
      break;
    case 'network-change':
      assert(event.type === UserInputEventType.InputChangeEvent);
      let network = '';
      switch (event.value) {
        case NetworkName.Mainnet:
          network = PublicApiUrl.Mainnet;
          break;
        case NetworkName.Buildnet:
          network = PublicApiUrl.Buildnet;
          break;
      }
      await setNetwork({ network });
      break;
    case 'custom-network-form':
      assert(event.type === UserInputEventType.FormSubmitEvent);
      await setNetwork({ network: event.value['custom-rpc'] as string });
      break;
  }
};
