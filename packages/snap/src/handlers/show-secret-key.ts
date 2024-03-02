import { DialogResult, panel, text } from "@metamask/snaps-sdk";
import { Handler } from "./handler";
import { MassaAccount } from "../account";


export const showSecretKey: Handler<void, DialogResult> = async () => {
  const account = await MassaAccount.getAccount();
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        text('Your secret key is:'),
        text(account.secretKey ?? '_No secret key found_'),
      ]),
    },
  });
};
