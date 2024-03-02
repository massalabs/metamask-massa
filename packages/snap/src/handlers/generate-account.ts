import { generateNewAccount } from "../accounts/manage-account";
import { Handler } from "./handler";

export type GenerateAccountParams = {
  name: string;
};

export type GenerateAccountResponse = {
  name: string;
  address: string;
};

const coerceParams = (params: GenerateAccountParams): GenerateAccountParams => {
  if (!params.name || typeof params.name !== "string") {
    throw new Error("Invalid params: name must be a string");
  }
  return params;
}

export const generateAccount: Handler<GenerateAccountParams, GenerateAccountResponse> = async (params) => {
  const { name } = coerceParams(params);
  const account = await generateNewAccount(name);
  return {
    name: account.name,
    address: account.address!
  };
}
