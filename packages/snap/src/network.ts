import {
  CHAIN_ID_TO_NETWORK_NAME,
  fromMAS,
  ProviderType,
  PublicApiClient,
} from '@massalabs/massa-web3';

export type NetworkInfos = {
  rpcUrl: string;
  chainId: string;
  minimalFees: string;
  networkName: string;
};

export async function fetchNetworkInfos(url: string): Promise<NetworkInfos> {
  const client = new PublicApiClient({
    providers: [{ url, type: ProviderType.PUBLIC }],
  });

  const node_status = await client.getNodeStatus();

  const networkName = CHAIN_ID_TO_NETWORK_NAME[node_status.chain_id.toString()];

  return {
    rpcUrl: client.clientConfig.providers[0]!.url!,
    chainId: node_status.chain_id.toString(),
    minimalFees: fromMAS(node_status.minimal_fees!).toString(),
    networkName: networkName ?? 'Custom',
  };
}
