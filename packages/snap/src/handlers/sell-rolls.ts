import { IRollsData } from "@massalabs/massa-web3";
import { getActiveClientWallet } from "../accounts/clients";
import { Handler } from "./handler";

export type SellRollsParams = {
  fee: string;
  amount: string;
};

export type SellRollsResponse = {
  operationId: string;
};

const coerceParams = (params: SellRollsParams): IRollsData => {
  if (!params.fee || typeof params.fee !== "string") {
    throw new Error("Invalid params: fee must be a string");
  }
  if (!params.amount || typeof params.amount !== "string") {
    throw new Error("Invalid params: amount must be a string");
  }
  return {
    fee: BigInt(params.fee),
    amount: BigInt(params.amount),
  };
}

export const sellRolls: Handler<SellRollsParams, SellRollsResponse> = async (params) => {
  const rollsData = coerceParams(params);
  const wallet = await getActiveClientWallet();
  const operationId = await wallet.sellRolls(rollsData);

  return { operationId: operationId[0]! };
}
