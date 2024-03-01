import { ADDRESS_CONTRACT_PREFIX, ADDRESS_PREFIX_LENGTH, ADDRESS_USER_PREFIX, PublicKey, utils } from "@massalabs/massa-web3"

/**
 * An address.
 *
 * @remarks when the address is created from a public key it got the same version as the public key.
 *
 * @remarks
 * - String representation is A + U/S + base58Check(version_bytes + hashBlake3(version_bytes + public_key_bytes))
 * - The address bytes representation is `version + hashBlake3(version + publicKey)`.
 * - bytes is not an attribute of the address object because it is not needed.
 */
export class Address {
  base58Encoded = ''
  version = 0
  isUser = false

  constructor(base58Encoded: string) {
    this.base58Encoded = base58Encoded
    this._initialize()
  }

  _initialize() {
    this.checkPrefixAndSetUserFlag()
    this.decodeVersionAndAddressBytes()
  }

  private checkPrefixAndSetUserFlag() {
    const prefix = this.base58Encoded.slice(0, ADDRESS_PREFIX_LENGTH)
    if (![ADDRESS_USER_PREFIX, ADDRESS_CONTRACT_PREFIX].includes(prefix)) {
      throw new Error(
        `Invalid address prefix '${prefix}'. Expected '${ADDRESS_USER_PREFIX}' for users or '${ADDRESS_CONTRACT_PREFIX}' for contracts.`
      )
    }
    this.isUser = prefix === ADDRESS_USER_PREFIX
  }

  private decodeVersionAndAddressBytes(): void {
    const versionAndAddress = this.base58Encoded.slice(ADDRESS_PREFIX_LENGTH)
    const versionAndAddressBytes = new Uint8Array(
      utils.crypto.base58Decode(versionAndAddress)
    )

    this.version = utils.crypto.varintDecode(versionAndAddressBytes).value
  }

  toBytes() {
    const addressCategory = Buffer.from([this.isUser ? 0 : 1])
    const addressContents = utils.crypto.base58Decode(
      this.base58Encoded.slice(ADDRESS_PREFIX_LENGTH)
    )
    return Buffer.concat([addressCategory, addressContents])
  }

  static fromPublicKey(publicKey: PublicKey): Address {
    const versionBuffer = Buffer.from(utils.crypto.varintEncode(publicKey.version))
    const versionAndPublicKey = Buffer.concat([versionBuffer, publicKey.bytes])

    const base58Encoded =
      ADDRESS_USER_PREFIX +
      utils.crypto.base58Encode(
        Buffer.concat([versionBuffer, utils.crypto.hashBlake3(versionAndPublicKey)])
      )

    return new Address(base58Encoded)
  }
}
