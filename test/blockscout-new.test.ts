import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Blockscout (New) Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(20 * SECONDS)
    });

    describe(`${getNetworkNameFromChainID(ChainID.IMMUTABLE_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.IMMUTABLE_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x4AC8A115131778c748E58e77cB7E58f850A31325",     // Token
                proxyContract: "0xBa5E35E26Ae59c7aea6F029B68c6460De2d13eB6",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Guild of Guardians Heroes";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
            const actualName: bigint = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedToken: string = "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualToken: string = await contract.methods.rootIMXToken().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualToken).toEqual(expectedToken);
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