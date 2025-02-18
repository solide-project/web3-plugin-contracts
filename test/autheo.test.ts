import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Autheo Explorer Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.AUTHEO_TESTNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.AUTHEO_TESTNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0xe2f1D4C06BdF42bfc9ABC074b10CbB37aE27DdF6",     // Token
                proxyContract: "0xe4C7fBB0a626ed208021ccabA6Be1566905E2dFc",
                unverifiedContract: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Test";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualName: string = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

        it("should create a contract instance for verified smart contract for additional sources", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: bigint = BigInt(18);

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract("0x6129B8079ad213a11B3AF3EFC1205315e20cA598"); // Pass an empty object as the second argument
            const actualName: bigint = await contract.methods.decimals().call();
            console.log(actualName)

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

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
