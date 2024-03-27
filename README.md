# web3-plugin-contracts

<a href="https://www.npmjs.com/package/web3-plugin-contracts">
    <img src="https://badge.fury.io/js/web3-plugin-contracts.svg" alt="npm version" height="18">
</a>

`web3-plugin-contracts` is a TypeScript library and a Web3.js plugin designed to simplify the process of loading and accessing source contracts and interacting with smart contracts. With this plugin, developers can seamlessly interact with Web3's `Contracts` class using only a contract address.

Read the [Proposal](https://github.com/solide-project/web3-plugin-contracts/blob/master/contractsPlugin.md) for more information.

## Features

- Access support for over 100+ chains effortlessly.
	- Explore all supported chains [here](https://github.com/solide-project/web3-plugin-contracts/blob/master/src/chains/chain-id.ts).
	- Need support for a specific chain? Submit a ticket.
- Obtain smart contract source code and metadata for any verified smart contract. This includes, but is not limited to:
	- Source code
	- ABI
	- Bytecode
	- Compiler version
	- Contract name
	- Compiler settings
- Load a `Contract` instance seamlessly, following the guidelines of the official Web3.js documentation ([https://docs.web3js.org/](https://docs.web3js.org/)). See Usage for example


## Installation

Use the package manager npm to install `web3-plugin-contracts`.

```bash
npm i web3-plugin-contracts
```

## Usage

The package is optimally utilized alongside `web3.js`. Simply extend the plugin as part of your web3 instance for seamless integration.

```ts
import Web3, { Contract } from "web3";
import { ContractPlugin } from 'web3-plugin-contract';

// Given a RPC, create web3 instance
const rpc: string = 'https://eth.drpc.org/';
const web3 = new Web3(
	new Web3.providers.HttpProvider(rpc));

// Optional API key, need for etherscan related chains
const API_KEY = ""; 

// Load plugin
web3.registerPlugin(new ContractPlugin(API_KEY));

// Verified smart contract
const contractAddress = "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481";

// Get contract source: includes, source code, compiler information, metadata
const data = await web3.contractPlugin.source(contractAddress);
console.log(data)

// Get web3 Contract instance
const contract: Contract = await web3.contractPlugin.contract(contractAddress);
const name: string = await contract.methods.name().call()

console.log(name)
```

Additionally, you have the flexibility to load both the source and contract without a Web3 instance. However, to interact with and invoke contract methods, it's essential to set a *provider* to the contract.

```ts
import { getSource, getContract } from "web3-plugin-contract";

// Verified smart contract
const contractAddress = "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481";

// Optional API key, need for etherscan related chains
const API_KEY = ""; 

// Get contract source: includes, source code, compiler information, metadata
const data = await getSource(contractAddress, {
	chainId: "1",
	apiKey: API_KEY
});
console.log(data)

// Get web3 Contract instance
const API_KEY = "";
const contract = await getContract(params.verifiedContract, {
	chainId: "1",
	apiKey: API_KEY
});
contract.setProvider(new Web3(
	new Web3.providers.HttpProvider('https://eth.drpc.org/')));
const name: string = await contract.methods.name().call()

console.log(name)
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)