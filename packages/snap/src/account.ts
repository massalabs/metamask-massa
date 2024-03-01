import {
  WalletClient,
  utils,
  SECRET_KEY_PREFIX,
  KEYS_VERSION_NUMBER,
  IAccount,
  ITransactionData,
  PublicApiClient,
  IClientConfig,
  IBaseAccount,
  Client,
  ClientFactory,
  DefaultProviderUrls,
  CHAIN_ID,
  IProvider,
  ProviderType,
  Web3Account,
  INodeStatus,
} from '@massalabs/massa-web3';
import { Address } from './utils';
import { panel, text } from '@metamask/snaps-sdk';
/*
const requestHeaders: [string, string][] = [
  ['Accept', 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*!!!!!!!!/*;q=0.8'],
  ['Access-Control-Allow-Origin', '*'],
  ['Access-Control-Allow-Credentials', 'true'],
  ['Access-Control-Allow-Methods', 'POST,OPTIONS'],
];*/

const requestHeaders: [string, string][] = [
  ['Accept', 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*!!!!!!!!/*;q=0.8'],
  ['Content-Type', 'application/json'],
];

enum OperationType {
  Transfert,
  SCcall
}

export class MassaAccount {
    static walletClient: WalletClient | null = null;
    static web3Client: Client | null = null;
    static account: IAccount | null = null;

    private static getOperationBufferToSign(
      chainId: bigint,
      bytesPublicKey: Uint8Array,
      bytesCompact: Buffer
    ): Buffer {
      // Chain id is an 64-bit unsigned integer, convert to byte array (big endian)
      const chainIdBuffer = new ArrayBuffer(8)
      const view = new DataView(chainIdBuffer)
      view.setBigUint64(0, chainId, false)

      return Buffer.concat([
        Buffer.from(chainIdBuffer),
        bytesPublicKey,
        bytesCompact,
      ])
    };

    public static async getNodeStatus() {
      const web3Client = await this.getWeb3Client();

      const body = {
        jsonrpc: '2.0',
        method: "get_status",
        params: null,
        id: 0,
      }

      const res = await fetch(
        "https://buildnet.massa.net/api/v2", {
          headers: requestHeaders,
          body: JSON.stringify(body),
          method: 'POST'
        }
      )
      const json = await res.json() as unknown as {result: INodeStatus };
      return json.result
    }

    public static async executeOperation(data: ITransactionData) {
      const walletClient = await this.getWalletClient();
      const account = await this.getAccount();
      if (account.publicKey === null) {
        await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'alert',
            content: panel([
              text('Account public key is null!'),
            ])
          }
        });
        return [];
      }
      const baseAccount = walletClient.getBaseAccount() as Web3Account;


      const status: INodeStatus = await this.getNodeStatus();

      const expiryPeriod: number =
        status.next_slot.period + baseAccount.clientConfig.periodOffset!;

      const feeEncoded = Buffer.from(utils.crypto.varintEncode(data.fee))
      const expirePeriodEncoded = Buffer.from(utils.crypto.varintEncode(expiryPeriod))
      const typeIdEncoded = Buffer.from(utils.crypto.varintEncode(0))

      const transferAmountEncoded = Buffer.from(utils.crypto.varintEncode(data.amount))
      const recipientAddressEncoded = new Address(data.recipientAddress).toBytes()


      const buffer = Buffer.concat([
        feeEncoded,
        expirePeriodEncoded,
        typeIdEncoded,
        recipientAddressEncoded,
        transferAmountEncoded,
      ]);

      const signature = await baseAccount.sign(this.getOperationBufferToSign(
        BigInt(CHAIN_ID.BuildNet),
        utils.bytes.getBytesPublicKey(account.publicKey!),
        buffer
      ));

      const obj = {
        serialized_content: Array.prototype.slice.call(buffer),
        creator_public_key: account.publicKey!,
        signature: signature.base58Encoded,
      }

      const body = {
        jsonrpc: '2.0',
        method: "send_operations",
        params: [[obj]],
        id: 0,
      }

      const res = (await fetch(
        "https://buildnet.massa.net/api/v2", {
          body: JSON.stringify(body),
          headers: requestHeaders,
          method: 'POST'
        }
      ))
      const body_str = await res.text();
      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text('Transaction response :'),
            text(body_str),
          ])
        }
      });
      const json = JSON.parse(body_str);
      return json.result;
    }

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
        true, // retry failed requests
        account
      );
     /*
     const account = await WalletClient.walletGenerateNewAccount();
     this.web3Client = await ClientFactory.createCustomClient(
        [
          { url: "https://buildnet.massa.net/api/v2", type: ProviderType.PUBLIC } as IProvider,
          { url: "https://buildnet.massa.net/api/v2", type: ProviderType.PRIVATE } as IProvider,
        ],
        CHAIN_ID.BuildNet,
        true,
        account
      );
      */
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

    private static async getPrivateKey () {
        const entropy = await snap.request({
          method: 'snap_getBip32Entropy',
          params: {
            curve: 'ed25519',
            path: ['m', "44'", "3'"],
          },
        });
        return entropy;
    };
}
