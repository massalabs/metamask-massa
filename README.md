# MetaMask Snap for Massa

Welcome to the MetaMask Snap for Massa! This Snap enables seamless integration of MetaMask with the Massa layer 1 protocol, providing users with convenient access to Massa's features directly through MetaMask.

## Snap Operations

The MetaMask Snap for Massa supports the following operations:

### 1. Get Balance
- **Method:** `account.balance`
- **Parameters:**
  - `address`: string
- **Response:**
  - `finalBalance`: string
  - `candidateBalance`: string

### 2. Import Account
- **Method:** `account.import`
- **Parameters:**
  - `privateKey`: string
  - `publicKey`: string
- **Response:**
  - `address`: string

### 3. Delete Account
- **Method:** `account.delete`
- **Parameters:**
  - `address`: string
- **Response:**
  - `response`: 'OK' | 'ERROR' | 'REFUSED'
  - `message?: string`

### 4. Sign Message
- **Method:** `account.sign`
- **Parameters:**
  - `address`: string
  - `data`: number[]
- **Response:**
  - `signature`: number[]
  - `publicKey`: string

### 5. Call Smart Contract
- **Method:** `account.callSC`
- **Parameters:**
  - `nickname`: string
  - `fee`: string
  - `functionName`: string
  - `at`: string
  - `args`: number[]
  - `coins`: string
  - `nonPersistentExecution?:`
    - `isNPE`: boolean
    - `maxGas`: string
- **Response:**
  - `operationId`: string

### 6. Send Transaction
- **Method:** `account.sendTransaction`
- **Parameters:**
  - `recipientAddress`: string
  - `amount`: bigint
  - `fee`: bigint
- **Response:**
  - `operationId`: string

### 7. Sell Rolls
- **Method:** `account.sellRolls`
- **Parameters:**
  - `fee`: string
  - `amount`: string
- **Response:**
  - `operationId`: string

### 8. Buy Rolls
- **Method:** `account.buyRolls`
- **Parameters:**
  - `fee`: string
  - `amount`: string
- **Response:**
  - `operationId`: string

### 9. Generate New Account
- **Method:** `account.generateNewAccount`
- **Parameters:**
  - `name`: string
- **Response:**
  - `name`: string
  - `address`: string

### 10. Set Active Account
- **Method:** `account.setActive`
- **Parameters:**
  - `address`: string
- **Response:**
  - `name`: string
  - `address`: string

### 11. Get Active Account
- **Method:** `account.getActive`
- **Response:**
  - `name`: string
  - `address`: string

### 12. Get Node URLs
- **Method:** `Provider.getNodeUrls`
- **Response:**
  - `nodeUrls`: string[]

### 13. List Accounts
- **Method:** `account.list`
- **Response:**
  - `accounts`: { name: string, address: string }[]

### 14. Get Network
- **Method:** `Provider.getNetwork`
- **Response:**
  - `network`: string // chainId

### 15. Set Network
- **Method:** `Provider.setNetwork`
- **Parameters:**
  - `network`: string
- **Response:**
  - `network`: string // chainId

### 16. Show Account Credentials
- **Method:** `account.showCredentials`
- **Parameters:**
  - `address?: string`
- **Response:**
  - `credentials`: string // Private and Public Key

### 17. Add Token
- **Method:** `account.addToken`
- **Parameters:**
  - `address`: string
  - `accountAddress?: string`
- **Response:**
  - `address`: string
  - `accountAddress`: string

### 18. Delete Token
- **Method:** `account.deleteToken`
- **Parameters:**
  - `address`: string
  - `accountAddress?: string`
- **Response:**
  - `response`: 'OK' | 'ERROR'
  - `message?: string`

### 19. Get Tokens
- **Method:** `account.getTokens`
- **Parameters:**
  - `address?: string`
- **Response:**
  - `tokens`: string[]

### 20. Get Operations
- **Method:** `account.getOperations`
- **Parameters:**
  - `address?: string`
- **Response:**
  - `operations`: string[]

### 21. Clear Operations
- **Method:** `account.clearOperations`
- **Parameters:**
  - `address?: string`
- **Response:**
  - `response`: 'OK' | 'ERROR' | 'REFUSED'
  - `message?: string`

For detailed information about each operation, including parameters and responses, refer to the corresponding DTOs in the codebase.

## Installation

To use the MetaMask Snap for Massa, follow these steps:

1. Install MetaMask: If you haven't already, install the MetaMask browser extension for your preferred browser.
2. Add Massa Network: Open MetaMask and add the Massa network to your network list. You'll need to provide the network details including RPC endpoint, chain ID, symbol, and block explorer URL.
3. Install MetaMask Snap: Install the MetaMask Snap for Massa by visiting the MetaMask Snap Store and searching for "Massa". Click on the Snap and follow the installation prompts.

## Contributing

We welcome contributions from the community! If you would like to contribute to the MetaMask Snap for Massa, please follow our [contribution guidelines](CONTRIBUTING.md) and submit a pull request.

## License

The MetaMask Snap for Massa is released under the [MIT License](LICENSE).
