import { CHAIN_ID, NetworkName, PublicApiUrl } from '@massalabs/massa-web3';
import { DEFAULT_MINIMAL_FEES } from '../../src/active-chain';

export const TOKEN = 'AS1sKBEGsqtm8vQhQzi7KJ4YhyaKTSkhJrLkRc7mQtPqme3VcFHm';

export const NETWORK = {
  rpcUrl: PublicApiUrl.Buildnet,
  chainId: CHAIN_ID.Buildnet.toString(),
  networkName: NetworkName.Buildnet,
  minimalFees: DEFAULT_MINIMAL_FEES,
};
