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

/**
 * @description MassaAccount class to handle account and client related operations
 * @class MassaAccount
 * @exports MassaAccount
 */
export class MassaAccount {
  static walletClient: WalletClient | null = null;

  static web3Client: Client | null = null;

  static account: IAccount | null = null;

  /**
   * @description Get WalletClient instance (creates one if not initialized yet)
   * @returns WalletClient instance
   */
  public static async getWalletClient() {
    if (!this.walletClient) {
      await this.setWalletClient();
    }
    return this.walletClient!;
  }

  /**
   * @description Get account instance (creates one if not initialized yet)
   * @returns IAccount instance
   */
  public static async getAccount() {
    if (!this.account) {
      await this.setAccount();
    }
    return this.account!;
  }

  /**
   * @description Get Web3Client instance (creates one if not initialized yet)
   * @returns Client instance
   */
  public static async getWeb3Client() {
    if (!this.web3Client) {
      await this.setWalletClient();
    }
    return this.web3Client!;
  }

  /**
   * @description Set WalletClient instance
   * @returns WalletClient instance
   */
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

  /**
   * @description Set account instance
   * @returns IAccount instance
   * @throws Error if no private key found
   */
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

  /**
   * @description Get private key of active account
   * @returns Private key as a string
   */
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
