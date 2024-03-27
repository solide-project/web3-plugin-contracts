# web3-plugin-contracts

`web3-plugin-contracts` is a typescript library and a web3.js plugin for loading and obtaining source contract and interaction with web's `Contract` with just a contract address.

Read the [Proposal](# web3-plugin-contracts) for more information

## Features

- Support over 100+ chains
	- To see all support chains [Chains]()
	- To request for a chains, submit a ticket
- Get smart contract source code and metadata for a given verified smart contract. This includes (not exhaustive)
	- source code
	- abi
	- bytecode
	- compiler version
	- contract name
	- compiler setting
- Load a `Contract` instance without the need for supplying ABI, according to the official web3.js documentation ([https://docs.web3js.org/](https://docs.web3js.org/)).

## Installation

Use the package manager npm to install `web3-plugin-contracts`.

```bash
npm i web3-plugin-contracts
```

## Usage

The package is best used with `web3.js`. Basically, you can just extend the plugin as part of web3 instance

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

You could also load both the source and contract without a Web3 instance, however you would need to set a *provider* to the contract in order to interact and invoke contract methods.

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