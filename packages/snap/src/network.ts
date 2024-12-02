import {
  getNetworkNameByChainId,
  Mas,
  Web3Provider,
} from '@massalabs/massa-web3';
import { getHDAccount } from './accounts/hd-deriver';

export type NetworkInfos = {
  rpcUrl: string;
  chainId: string;
  minimalFees: string;
  networkName: string;
};

export async function fetchNetworkInfosFromUrl(
  rpcUrl: string,
): Promise<NetworkInfos> {
  const account = await getHDAccount();
  const provider = Web3Provider.fromRPCUrl(rpcUrl, account);
  const networkInfo = await provider.getNodeStatus();

  const networkName = getNetworkNameByChainId(BigInt(networkInfo.chainId));

  return {
    rpcUrl,
    chainId: networkInfo.chainId.toString(),
    minimalFees: Mas.fromString(networkInfo.minimalFees!).toString(),
    networkName: networkName ?? 'Custom',
  };
}
