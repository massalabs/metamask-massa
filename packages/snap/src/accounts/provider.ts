import { Provider, Web3Provider } from '@massalabs/massa-web3';

import { getHDAccount } from './hd-deriver';
import { getActiveNetwork } from '../active-chain';

export async function getProvider(): Promise<Provider> {
  const account = await getHDAccount();
  const networkInfos = await getActiveNetwork();
  return Web3Provider.fromRPCUrl(networkInfos.rpcUrl, account);
}
