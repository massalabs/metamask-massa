# MetaMask Snap for Massa

Welcome to the MetaMask Snap for Massa! This Snap enables seamless integration of MetaMask with the Massa layer 1 protocol, providing users with convenient access to Massa's features directly through MetaMask.

# Powered by
Astro-Devs Labs

## Snap Operations

The MetaMask Snap for Massa supports the following operations:

### 1. Get Balance

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account.balance</code></td>
<td>
```ts
  {
    address: string
  }
```
</td><td>

  ```ts
  {
      finalBalance: string,
      candidateBalance: string
  }

  ```
</td><td>

  ```ts
  {

        address: "AU1234567890abcdef"
  }
  ```

</td><td>

  ```ts
  {
    finalBalance: "100",
    candidateBalance: "200",
  }
  ```
</td></tr>
  </tbody>
</table>

### 2. Import Account
<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.import</code></td>
    <td>

```ts
{
  privateKey: string,
  publicKey: string
}
```

</td><td>

```ts
{
  address: string
}
```

</td><td>

```ts
{
  privateKey: "S1234567890abcdef",
  publicKey: "Pabcdef1234567890"
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef"
}
```

</td>
  </tr>
  </tbody>
</table>

### 3. Delete Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.delete</code></td>
    <td>

```ts
{
  address: string
}
```
</td><td>

```ts
{
  response: 'OK' | 'ERROR' | 'REFUSED',
  message?: string
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef"
}
```

</td><td>

```ts
{
  response: "OK"
}
```

</td>
  </tr>
  </tbody>
</table>

### 4. Sign Message

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.sign</code></td>
    <td>

```ts
{
  address: string,<br>data: number[]
}
```
</td><td>

```ts
{
  signature: number[],
  publicKey: string
}
```

</td><td>

```ts
{
    address: "AU1234567890abcdef",
    data: [1, 2, 3]
}
```
</td><td>

```ts
{
  signature: [4, 5, 6],
  publicKey: "Pabcdef1234567890"
}
```
</td>
  </tr>
  </tbody>
</table>

### 5. Call Smart Contract

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.callSC</code></td>
    <td>

```ts
{
  nickname: string,
  fee: string,
  functionName: string,
  at: string,
  args: number[],
  coins: string,
  nonPersistentExecution?: {
    isNPE: boolean,
    maxGas: string
  }
}
```

</td><td>

```ts
{
  operationId: string
}
```
</td><td>

```ts
{
  nickname: "TestContract",
  fee: "100",
  functionName: "transfer",
  at: "ASabcdef1234567890",
  args: [1, 2, 3],
  coins: "Massa"
}
```

</td><td>

```ts
{
  operationId: "OP1234567890abcdef"
}
```
</td>
  </tr>
  </tbody>
</table>

### 6. Send Transaction

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.sendTransaction</code></td>
    <td>

```ts
{
  recipientAddress: string,
  amount: bigint,
  fee: bigint
}
```

</td><td>

```ts
{
  operationId: string
}
```

</td><td>

```ts
{
  recipientAddress: "AU1234567890abcdef",
  amount: 100,
  fee: 10
}
```
</td><td>

```ts
{
  operationId: "OP1234567890abcdef"
}

```
</td>
  </tr>
  </tbody>
</table>

### 7. Sell Rolls

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.sellRolls</code></td>
    <td>

```ts
{
  fee: string,
  amount: string
}
```

  <td>

```ts
{
  operationId: string
}
```

  <td>

```ts
{
  fee: "100",
  amount: "50"
}
```

  <td>

```ts
{
  operationId: "OP1234567890abcdef"
}
```

  </tr>
</table>

### 8. Buy Rolls

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.buyRolls</code></td>
    <td>

```ts
{
    fee: string,
    amount: string
}
```

</td><td>

```ts
{
  operationId: string
}
```

</td><td>

```ts
{
  fee: "100",
  amount: "50"
}
```
</td><td>

```ts
{
  operationId: "OP1234567890abcdef"
}
```

</td>
  </tr>
  </tbody>
</table>


### 9. Generate New Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.generateNewAccount</code></td>
    <td>

```ts
{
  name: string
}
```

</td><td>

```ts
{
  name: string,
  address: string
}
```

</td><td>

```ts
{
  name: "New Account"
}
```

</td><td>

```ts
{
  name: "New Account",
  address: "AU1234567890abcdef"
}
```

</td>
  </tr>
  </tbody>
</table>

### 10. Set Active Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.setActive</code></td>
    <td>

```ts
{
  address: string
}
```

</td><td>

```ts
{
  name: string,
  address: string
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef"
}
```

</td><td>

```ts
{
  name: "New Active",
  address: "AU1234567890abcdef"
}
```
</td>
  </tr>
  </tbody>
</table>


### 11. Get Active Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.getActive</code></td>
    <td></td>
    <td>

```ts
{
  name: string,
  address: string
}
```

  </td>
    <td></td>
    <td>

```ts
{
  name: "Active Account",
  address: "AU1234567890abcdef"
}
```

</td>
  </tr>
  </tbody>
</table>

### 12. Get Node URLs

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>Provider.getNodeUrls</code></td>
    <td></td>
    <td><code>string[]<code></td>
    <td></td>
    <td>

```ts
["https://node1.example.com", "https://node2.example.com"]
```

  </td>
  </tr>
  </tbody>
</table>

### 13. Sell Rolls

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.sellRolls</code></td>
    <td>

```ts
{
  fee: string,
  amount: string
}
```

  <td>

```ts
{
  operationId: string
}
```

  <td>

```ts
{
  fee: "100",
  amount: "50"
}
```

  <td>

```ts
{
  operationId: "OP1234567890abcdef"
}
```

</tr>

  </tbody>
</table>

### 14. Buy Rolls

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.buyRolls</code></td>
    <td>

```ts
{
  fee: string,
  amount: string
}
```

  <td>

```ts
{
  operationId: string
}
```

  <td>

```ts
{
  fee: "100",
  amount: "50"
}
```

  <td>

```ts
{
  operationId: "OP1234567890abcdef"
}
```

  </tr>
  </tbody>
</table>

### 15. Generate New Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.generateNewAccount</code></td>
    <td>

```ts
{
  name: string
}
```

  <td>

```ts
{
  name: string,
  address: string
}
```

  <td>

```ts
{
  name: "New Account"
}
```

  <td>

```ts
{
  name: "New Account",
  address: "AU1234567890abcdef"
}
```

  </tr>
  </tbody>
</table>

### 16. Set Active Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.setActive</code></td>
    <td>

```ts
{
  address: string
}
```
  <td>

```ts
{
  name: string,
  address: string
}
```
  <td>

```ts
{
  address: "AU1234567890abcdef"
}
```
  <td>

```ts
{
  name: "New Active",
  address: "AU1234567890abcdef"
}
```
  </tr>
  </tbody>
</table>

### 17. Get Active Account

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.getActive</code></td>
    <td></td>
    <td>

```ts
{
  name: string,
  address: string
}
```

</td><td></td><td>

```ts
{
  name: "Account 0",
  address: "AU12ZDFfdf2Rdf3f4fg"
}
```
</td>
  </tr>
 </tbody>
</table>

### 18. Get Node URLs

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>Provider.getNodeUrls</code></td>
    <td></td>
    <td><code>string[]</code></td>
    <td></td>
    <td>

```ts
["https://node1.example.com", "https://node2.example.com"]
```

</td>
  </tr>
  </tbody>
</table>

### 19. Show Account Credentials

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.showCredentials</code></td>
    <td>

```ts
{
  address?: string<br>
}
```

</td><td>

```ts
{
  publicKey: string<br>
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef"<br>
}
```

</td><td>

```ts
{
  publicKey: "Pabcdef1234567890"<br>
}
```

</td></tr>

  </tbody>
</table>

### 20. Add Token

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>account.addToken</code></td>
    <td>

```ts
{
  address: string,
  accountAddress?: string
}
```

</td><td>

```ts
{
  address: string,
  accountAddress: string
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef",
  accountAddress: "AU1234567890abcdef"
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef",
  accountAddress: "AU1234567890abcdef"
}
```

</td></tr>
  </tbody>
</table>

### 21. Delete Token

<table>
  <thead>
    <tr>
    <th>Method</th>
    <th>Parameters</th>
    <th>Response</th>
    <th>Param Example</th>
    <th>Response Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>account.deleteToken</td>
    <td>

```ts
{
  accountAddress?: string,
  address: string
}
```

</td><td>

```ts
{
  response: 'OK' | 'ERROR',
  message?: string
}
```

</td><td>

```ts
{
  address: "AU1234567890abcdef",
  accountAddress: "AU1234567890abcdef"
}
```

</td><td>

```ts
{
  response: "OK"
}
```

</td>
  </tr>
  </tbody>
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

The MetaMask Snap for Massa is released under the BSL license.
