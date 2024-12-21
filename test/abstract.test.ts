import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Abstract Explorer Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.ABSTRACT_TESTNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.ABSTRACT_TESTNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x22F4D93be0E8C0C081e74c0d5e697B64eEA007FF",     // Token
                proxyContract: "0xe4C7fBB0a626ed208021ccabA6Be1566905E2dFc",
                unverifiedContract: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedOwner: string = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualOwner: bigint = await contract.methods.owner().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualOwner).toEqual(expectedOwner);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedOwner: string = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualOwner: bigint = await contract.methods.owner().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualOwner).toEqual(expectedOwner);
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
