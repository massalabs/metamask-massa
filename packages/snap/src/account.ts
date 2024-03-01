import type { IAccount, Client } from '@massalabs/massa-web3';
import {
  WalletClient,
  utils,
  SECRET_KEY_PREFIX,
  KEYS_VERSION_NUMBER,
  ClientFactory,
  DefaultProviderUrls,
  CHAIN_ID,
} from '@massalabs/massa-web3';

export class MassaAccount {
  static walletClient: WalletClient | null = null;

  static web3Client: Client | null = null;

  static account: IAccount | null = null;

  public static async getWalletClient() {
    if (!this.walletClient) {
      await this.setWalletClient();
    }
    return this.walletClient!;
  }

  public static async getAccount() {
    if (!this.account) {
      await this.setAccount();
    }
    return this.account!;
  }

  public static async getWeb3Client() {
    if (!this.web3Client) {
      await this.setWalletClient();
    }
    return this.web3Client!;
  }

  private static async setWalletClient() {
    const account = await this.getAccount();
    this.web3Client = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.BUILDNET,
      CHAIN_ID.BuildNet,
      true,
      account,
    );
    this.walletClient = this.web3Client.wallet();
    this.walletClient.addAccountsToWallet([account]);
  }

  private static async setAccount() {
      const account = await this.getPrivateKey();

      if (!account?.privateKey) {
        throw new Error('No private key found');
      }

      const bytes = new TextEncoder().encode(account.privateKey.slice(0, 32));

      const version = Uint8Array.from(
        utils.crypto.varintEncode(KEYS_VERSION_NUMBER),
      );
      const encoded = utils.crypto.base58Encode(
        Uint8Array.from([...version, ...bytes]),
      );
    const secretKey = SECRET_KEY_PREFIX + encoded;

    this.account = await WalletClient.getAccountFromSecretKey(secretKey);
  }

  private static async getPrivateKey() {
    const entropy = await snap.request({
      method: 'snap_getBip32Entropy',
      params: {
        curve: 'ed25519',
        path: ['m', "44'", "3'"],
      },
    });
    return entropy;
  }
}
