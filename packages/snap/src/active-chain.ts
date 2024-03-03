import { CHAIN_ID } from "@massalabs/massa-web3";
import { StateManager } from "./state-manager";

export async function getActiveChainId(): Promise<bigint> {
  const chain = await StateManager.getState("activeChainId");

  if (!chain) {
    await StateManager.setState("activeChainId", CHAIN_ID.MainNet.toString());
    return CHAIN_ID.MainNet;
  }
  return BigInt(chain);
}

export async function setActiveChainId(chainId: bigint) {
  await StateManager.setState("activeChainId", chainId.toString());
}
