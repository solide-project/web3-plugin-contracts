import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Filscan Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.FILECOIN_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.FILECOIN_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x7b90337f65faa2b2b8ed583ba1ba6eb0c9d7ea44",
                proxyContract: "0xba5cd7ef1414c33e3a250fb89ad7c8f49844762d",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedMaxSupply: bigint = BigInt(1000000000000000019884624838656);

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualMaxSupply: bigint = await contract.methods.maxSupply().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualMaxSupply).toEqual(expectedMaxSupply);
        });

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract);
            const method = contract.methods.implementation()

            // Assert
            expect(contract).not.toBeNull();
            expect(method).not.toBeNull();
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
