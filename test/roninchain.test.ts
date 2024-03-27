import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Roninchain Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.RONIN_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.RONIN_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0xd78efaec85c1a4f42e6edb7209067702a2be8c90",     // KaidroJournal
                proxyContract: "0x32950db2a7164ae833121501c797d79e7b79d74c",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "KaidroJournal";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualName: string = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        });

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Axie";
            const expectedToAdultDuration: bigint = BigInt(432000);

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualName: string = await contract.methods.name().call();
            const actualToAdultDuration: bigint = await contract.methods.toAdultDuration().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
            expect(actualToAdultDuration).toEqual(expectedToAdultDuration);
        });

        it("should throw an error for unverified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);

            // Act & Assert
            await expect(async () => {
                web3Context.registerPlugin(new ContractPlugin(params.apiKey));
                await web3Context.contractPlugin.contract(params.unverifiedContract);
            }).rejects.toThrow();
        });
    });

    describe(`${getNetworkNameFromChainID(ChainID.RONIN_SAIGON_TESTNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.RONIN_SAIGON_TESTNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0xf0c99c9677eda0d13291c093b27e6512e4acdf83",     // Ronin Name Service
                proxyContract: "0xa2aa501b19aff244d90cc15a4cf739d2725b5729",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Ronin Name Service";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualName: bigint = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        });

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedChainId: bigint = BigInt(60029);

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualChainId: bigint = await contract.methods.chainId().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualChainId).toEqual(expectedChainId);
        });

        it("should throw an error for unverified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);

            // Act & Assert
            await expect(async () => {
                web3Context.registerPlugin(new ContractPlugin(params.apiKey));
                await web3Context.contractPlugin.contract(params.unverifiedContract);
            }).rejects.toThrow();
        });
    });
});
