import { MassaAccount } from "../account";
import { Handler } from "./handler";

export const getAddress: Handler<void, string> = async () => {
  const account = await MassaAccount.getAccount();
  return account.address!;
};
