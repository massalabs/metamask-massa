import { getActiveChainId } from "../active-chain";
import { Handler } from "./handler";
import { CHAIN_ID } from "@massalabs/massa-web3";

export type GetNetworkResponse = {
  network: string; // chainId
};

export const getNetwork: Handler<void, GetNetworkResponse> = async () => {
  const chainId = await getActiveChainId();
  return {
    network: chainId.toString(),
  };
}
