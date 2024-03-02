import { CHAIN_ID, DefaultProviderUrls } from "@massalabs/massa-web3";
import { getActiveChainId } from "../active-chain";
import { Handler } from "./handler";

// url list
export type GetNodeUrlsResponse = string[];

export const getNodeUrls: Handler<void, GetNodeUrlsResponse> = async () => {
  const chain = await getActiveChainId();
  
  return [
    chain == CHAIN_ID.MainNet ? DefaultProviderUrls.MAINNET as string : DefaultProviderUrls.BUILDNET as string
  ];
}
