import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Multiscan Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.CHILIZ_CHAIN)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            routescanContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.CHILIZ_CHAIN;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x3175e779b42D35e2C9EeafadCf5B6E6ec6E4f910",     // Token
                routescanContract: "0x4EaAF1528D0ed68F5EDf79ab5156D51bE47527fc",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract blockscout", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Internacional";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualName: bigint = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

        it("should create a contract instance for verified smart contract routescan", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedPaused: boolean = false;

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.routescanContract); // Pass an empty object as the second argument
            const actualPaused: boolean = await contract.methods.paused().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualPaused).toEqual(expectedPaused);
        }, 30 * SECONDS);
    });
})
