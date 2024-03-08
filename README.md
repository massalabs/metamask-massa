# MetaMask Snap for Massa

Welcome to the MetaMask Snap for Massa! This Snap enables seamless integration of MetaMask with the Massa layer 1 protocol, providing users with convenient access to Massa's features directly through MetaMask.

# Powered by
Astro-Devs Labs

## Snap Operations

The MetaMask Snap for Massa supports the following operations:

### 1. Get Balance

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.balance</td>
    <td>{<br>address: string<br>}</td>
    <td>{<br>finalBalance: string,<br>candidateBalance: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
    <td>{<br>finalBalance: "100",<br>candidateBalance: "200"<br>}</td>
  </tr>
</table>

### 2. Import Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.import</td>
    <td>{<br>privateKey: string,<br>publicKey: string<br>}</td>
    <td>{<br>address: string<br>}</td>
    <td>{<br>privateKey: "S1234567890abcdef",<br>publicKey: "Pabcdef1234567890"<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 3. Delete Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.delete</td>
    <td>{<br>address: string<br>}</td>
    <td>{<br>response: 'OK' | 'ERROR' | 'REFUSED',<br>message?: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
    <td>{<br>response: "OK"<br>}</td>
  </tr>
</table>

### 4. Sign Message

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.sign</td>
    <td>{<br>address: string,<br>data: number[]<br>}</td>
    <td>{<br>signature: number[],<br>publicKey: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef",<br>data: [1, 2, 3]<br>}</td>
    <td>{<br>signature: [4, 5, 6],<br>publicKey: "Pabcdef1234567890"<br>}</td>
  </tr>
</table>

### 5. Call Smart Contract

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.callSC</td>
    <td>{<br>nickname: string,<br>fee: string,<br>functionName: string,<br>at: string,<br>args: number[],<br>coins: string,<br>nonPersistentExecution?: { isNPE: boolean, maxGas: string }<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>nickname: "TestContract",<br>fee: "100",<br>functionName: "transfer",<br>at: "ASabcdef1234567890",<br>args: [1, 2, 3],<br>coins: "Massa"<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 6. Send Transaction

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.sendTransaction</td>
    <td>{<br>recipientAddress: string,<br>amount: bigint,<br>fee: bigint<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>recipientAddress: "AU1234567890abcdef",<br>amount: 100,<br>fee: 10<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 7. Sell Rolls

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.sellRolls</td>
    <td>{<br>fee: string,<br>amount: string<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>fee: "100",<br>amount: "50"<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 8. Buy Rolls

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.buyRolls</td>
    <td>{<br>fee: string,<br>amount: string<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>fee: "100",<br>amount: "50"<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 9. Generate New Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.generateNewAccount</td>
    <td>{<br>name: string<br>}</td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td>{<br>name: "New Account"<br>}</td>
    <td>{<br>name: "New Account",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 10. Set Active Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.setActive</td>
    <td>{<br>address: string<br>}</td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
    <td>{<br>name: "New Active",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 11. Get Active Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.getActive</td>
    <td></td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td></td>
    <td>{<br>name: "Active Account",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 12. Get Node URLs

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>Provider.getNodeUrls</td>
    <td></td>
    <td>string[]</td>
    <td></td>
    <td>["https://node1.example.com", "https://node2.example.com"]</td>
  </tr>
</table>

### 13. Sell Rolls

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.sellRolls</td>
    <td>{<br>fee: string,<br>amount: string<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>fee: "100",<br>amount: "50"<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 14. Buy Rolls

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.buyRolls</td>
    <td>{<br>fee: string,<br>amount: string<br>}</td>
    <td>{<br>operationId: string<br>}</td>
    <td>{<br>fee: "100",<br>amount: "50"<br>}</td>
    <td>{<br>operationId: "OP1234567890abcdef"<br>}</td>
  </tr>
</table>

### 15. Generate New Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.generateNewAccount</td>
    <td>{<br>name: string<br>}</td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td>{<br>name: "New Account"<br>}</td>
    <td>{<br>name: "New Account",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 16. Set Active Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.setActive</td>
    <td>{<br>address: string<br>}</td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
    <td>{<br>name: "New Active",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 17. Get Active Account

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.getActive</td>
    <td></td>
    <td>{<br>name: string,<br>address: string<br>}</td>
    <td></td>
    <td>{<br>name: "Active Account",<br>address: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 18. Get Node URLs

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>Provider.getNodeUrls</td>
    <td></td>
    <td>string[]</td>
    <td></td>
    <td>["https://node1.example.com", "https://node2.example.com"]</td>
  </tr>
</table>

### 19. Show Account Credentials

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.showCredentials</td>
    <td>{<br>address?: string<br>}</td>
    <td>{<br>publicKey: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef"<br>}</td>
    <td>{<br>publicKey: "Pabcdef1234567890"<br>}</td>
  </tr>
</table>

### 20. Add Token

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.addToken</td>
    <td>{<br>address: string,<br>accountAddress?: string<br>}</td>
    <td>{<br>address: string,<br>accountAddress: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef",<br>accountAddress: "AU1234567890abcdef"<br>}</td>
    <td>{<br>address: "AU1234567890abcdef",<br>accountAddress: "AU1234567890abcdef"<br>}</td>
  </tr>
</table>

### 21. Delete Token

<table>
  <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
  </tr>
  <tr>
    <td>account.deleteToken</td>
    <td>{<br>accountAddress?: string,<br>address: string<br>}</td>
    <td>{<br>response: 'OK' | 'ERROR',<br>message?: string<br>}</td>
    <td>{<br>address: "AU1234567890abcdef",<br>accountAddress: "AU1234567890abcdef"<br>}</td>
    <td>{<br>response: "OK"<br>}</td>
  </tr>
</table>

For detailed information about each operation, including parameters and responses, refer to the corresponding DTOs in the codebase.

## Installation

To use the MetaMask Snap for Massa, follow these steps:

1. Install MetaMask: If you haven't already, install the MetaMask browser extension for your preferred browser.
2. Add Massa Network: Open MetaMask and add the Massa network to your network list. You'll need to provide the network details including RPC endpoint, chain ID, symbol, and block explorer URL.
3. Install MetaMask Snap: Install the MetaMask Snap for Massa by visiting the MetaMask Snap Store and searching for "Massa". Click on the Snap and follow the installation prompts.

## Contributing

We welcome contributions from the community! If you would like to contribute to the MetaMask Snap for Massa, please follow our [contribution guidelines](CONTRIBUTING.md) and submit a pull request.

## License

The MetaMask Snap for Massa is released under the [GNU-GPL-V3.0](LICENSE).
