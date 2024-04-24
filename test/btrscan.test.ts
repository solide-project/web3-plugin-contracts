import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Chainlens Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.BITLAYER_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.BITLAYER_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x0e4cf4affdb72b39ea91fa726d291781cbd020bf",
                proxyContract: "0x1628330103126ab7348bad54ec47836e5bb72887",        // Proxy doesn't exist
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName = "BTR Token";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualName: string = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        });

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "TENDER"

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract);

            // Assert
            expect(contract).not.toBeNull();
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

    describe(`${getNetworkNameFromChainID(ChainID.BITLAYER_TESTNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.BITLAYER_TESTNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0xf4340cf5f3891a3827713b33f769b501a0b5b122",
                proxyContract: "0x9a22321b637925220f14ee3cc98ab916c9835ecc",        // Proxy doesn't exist
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName = "BRC Token";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualName: string = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        });

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "TENDER"

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract);

            // Assert
            expect(contract).not.toBeNull();
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
