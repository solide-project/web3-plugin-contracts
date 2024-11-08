import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("CoreScan Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.CORE_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.CORE_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x6edf8aecaa888896385d7fa19d2aa4eaff3c10d8",
                proxyContract: "0xeb089519d2845ef38eda6356f6cb3ab29182951e",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedFeeTo: string = "0xc84EC85a14D791162CA3C0A98903967506002846";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualFeeTo: string = await contract.methods.feeTo().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualFeeTo).toEqual(expectedFeeTo);
        });

        // it("should create the implementation contract instance for a proxy contract", async () => {
        //     // Arrange
        //     const web3Context = new core.Web3Context(params.rpc);

        //     // Act
        //     web3Context.registerPlugin(new ContractPlugin());
        //     const contract = await web3Context.contractPlugin.contract(params.proxyContract);
        //     const method = contract.methods.implementation()

        //     // Assert
        //     expect(contract).not.toBeNull();
        //     expect(method).not.toBeNull();
        // });

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
