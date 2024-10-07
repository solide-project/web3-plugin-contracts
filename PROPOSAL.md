# [web3-plugin-contracts] Ideathon Proposal

## Overview

The Contracts Plugin works simplify contract interaction processes with Solidity base smart contracts. This plugin addresses the challenge of efficiently interacting with contracts by eliminating the need of storing and managing contract instances and ABI. Consequently, it significantly enhances developer experience and project functionality by streamlining contract interactions, enabling smoother integration with external contracts, and ultimately improving overall project efficiency.

### Storage

### Functions
#### `contract(string)`

- **Description:** Retrieves contract ABI and instantiates a Web3 `Contract` object.
- **Steps:**
    1. Fetch contract source data using `source` function with provided contract address and options.
    3. Handle cases where contract data is not available or retrieved unsuccessfully; throw an error accordingly.
    4. Validate the retrieved ABI; if it's not found or not in the correct format, throw an error.
    6. Parse the ABI into JSON format and create a new `Contract` instance using Web3.
    7. Return the instantiated contract object.

#### `source(string)`

- **Description:** Retrieves contract source code using a specified scanner.
- **Steps:**
    1. Obtain the appropriate scanner instance based on the provided chain ID and API key using `getScanner` function.
    2. Ensure that a valid scanner instance is retrieved; if not, throw an error indicating that the chain may not be supported.
    3. Return the result, which contains the contract source code.

## Category

- [x] Community Plugin
- [ ] Project Plugin
- [ ] Other

## Use Cases

- [X] Developer Experience (The Plugin enhances developer experience by simplifying the process of contract interact and information, eliminating the necessity to manually define its metadata. This saves significant time and reduces complexity, where users can effortlessly retrieve contract information on-the-fly, enabling smoother interactions with various contracts.)
- [ ] Gas optimization
- [ ] Other

## Usage (Before & After Plugin)

Before the plugin, developers had to manually store and manage metadata of a contract including artifacts and ABI, leading to complexities and inefficiencies when interacting with external contracts. However, with the Contracts Plugin, developers gain the ability to effortlessly access contract information through various services and explorers. This allows for seamless instantiation and interaction with any contract, simply by providing its address.

[Video](#TODO)

# [web3-plugin-contracts] Ideathon Proposal

## Overview

The Contracts Plugin works simplify contract interaction processes with Solidity base smart contracts. This plugin addresses the challenge of efficiently interacting with contracts by eliminating the need of storing and managing contract instances and ABI. Consequently, it significantly enhances developer experience and project functionality by streamlining contract interactions, enabling smoother integration with external contracts, and ultimately improving overall project efficiency.

### Storage

### Functions
#### `contract(string)`

- **Description:** Retrieves contract ABI and instantiates a Web3 `Contract` object.
- **Steps:**
    1. Fetch contract source data using `source` function with provided contract address and options.
    3. Handle cases where contract data is not available or retrieved unsuccessfully; throw an error accordingly.
    4. Validate the retrieved ABI; if it's not found or not in the correct format, throw an error.
    6. Parse the ABI into JSON format and create a new `Contract` instance using Web3.
    7. Return the instantiated contract object.

#### `source(string)`

- **Description:** Retrieves contract source code using a specified scanner.
- **Steps:**
    1. Obtain the appropriate scanner instance based on the provided chain ID and API key using `getScanner` function.
    2. Ensure that a valid scanner instance is retrieved; if not, throw an error indicating that the chain may not be supported.
    3. Return the result, which contains the contract source code.

## Category

- [x] Community Plugin
- [ ] Project Plugin
- [ ] Other

## Use Cases

- [X] Developer Experience (The Plugin enhances developer experience by simplifying the process of contract interact and information, eliminating the necessity to manually define its metadata. This saves significant time and reduces complexity, where users can effortlessly retrieve contract information on-the-fly, enabling smoother interactions with various contracts.)
- [ ] Gas optimization
- [ ] Other

## Usage (Before & After Plugin)

Before the plugin, developers had to manually store and manage metadata of a contract including artifacts and ABI, leading to complexities and inefficiencies when interacting with external contracts. However, with the Contracts Plugin, developers gain the ability to effortlessly access contract information through various services and explorers. This allows for seamless instantiation and interaction with any contract, simply by providing its address.