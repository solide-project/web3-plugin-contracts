import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Vicscan Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    // describe(`${getNetworkNameFromChainID(ChainID.VICTION_MAINNET)} Test`, () => {
    //     let params: {
    //         chainId: string
    //         rpc: string,
    //         apiKey?: string
    //         verifiedContract: string
    //         proxyContract: string
    //         unverifiedContract: string
    //     }
    //     beforeAll(() => {
    //         const chain = ChainID.VICTION_MAINNET;
    //         params = {
    //             chainId: chain,
    //             rpc: getRPC(chain),
    //             apiKey: getAPIKey(chain),
    //             verifiedContract: "0x0b792a01Fd3E8b3e23aaaA28561c3E774A82AA7b",
    //             proxyContract: "0x0000000000000000000000000000000000000000",
    //             unverifiedContract: "0x0000000000000000000000000000000000000000"
    //         }
    //     });

    //     it("should create a contract instance for verified smart contract", async () => {
    //         // Arrange
    //         const web3Context = new core.Web3Context(params.rpc);
    //         const expectedWETH: string = "0xB1f66997A5760428D3a87D68b90BfE0aE64121cC";

    //         // Act
    //         web3Context.registerPlugin(new ContractPlugin());
    //         const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
    //         const actualWETH: bigint = await contract.methods.WETH().call();

    //         // Assert
    //         expect(contract).not.toBeNull();
    //         expect(expectedWETH).toEqual(actualWETH);
    //     });

    //     it("should throw an error for unverified smart contract", async () => {
    //         // Arrange
    //         const web3Context = new core.Web3Context(params.rpc);

    //         // Act & Assert
    //         await expect(async () => {
    //             web3Context.registerPlugin(new ContractPlugin(params.apiKey));
    //             await web3Context.contractPlugin.contract(params.unverifiedContract);
    //         }).rejects.toThrow();
    //     });
    // });

    // describe(`${getNetworkNameFromChainID(ChainID.VICTION_TESTNET)} Test`, () => {
    //     let params: {
    //         chainId: string
    //         rpc: string,
    //         apiKey?: string
    //         verifiedContract: string
    //         proxyContract: string
    //         unverifiedContract: string
    //     }
    //     beforeAll(() => {
    //         const chain = ChainID.VICTION_TESTNET;
    //         params = {
    //             chainId: chain,
    //             rpc: getRPC(chain),
    //             apiKey: getAPIKey(chain),
    //             verifiedContract: "0x69d75da9e018f3E624c173358f47fffCdBaB5362",
    //             proxyContract: "0x0000000000000000000000000000000000000000",
    //             unverifiedContract: "0x0000000000000000000000000000000000000000"
    //         }
    //     });

    //     it("should create a contract instance for verified smart contract", async () => {
    //         // Arrange
    //         const web3Context = new core.Web3Context(params.rpc);
    //         const expectedSymbol: string = "USDT";

    //         // Act
    //         web3Context.registerPlugin(new ContractPlugin());
    //         const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
    //         const actualSymbol: bigint = await contract.methods.symbol().call();

    //         // Assert
    //         expect(contract).not.toBeNull();
    //         expect(expectedSymbol).toEqual(actualSymbol);
    //     });

    //     it("should throw an error for unverified smart contract", async () => {
    //         // Arrange
    //         const web3Context = new core.Web3Context(params.rpc);

    //         // Act & Assert
    //         await expect(async () => {
    //             web3Context.registerPlugin(new ContractPlugin(params.apiKey));
    //             await web3Context.contractPlugin.contract(params.unverifiedContract);
    //         }).rejects.toThrow();
    //     });
    // });

    describe(`${getNetworkNameFromChainID(ChainID.VICTION_TESTNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
        }
        beforeAll(() => {
            const chain = ChainID.VICTION_TESTNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "USDT";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract("0xDb14c007634F6589Fb542F64199821c3308A9d92");
            const actualSymbol: bigint = await contract.methods.symbol().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(expectedSymbol).toEqual(actualSymbol);
        });
    });

});
