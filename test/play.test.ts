import { Web3 } from "web3";
import { getContract } from "../src";
import { ChainID, getAPIKey, getRPC } from "../src/chains";

describe("TemplatePlugin Tests", () => {
    const SECONDS = 1000;
    require('dotenv').config();

    beforeEach(() => {
        jest.setTimeout(30 * SECONDS)
    });

    describe(`General Playtest`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.FANTOM_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
                proxyContract: "0xf9bf9e70071c830f65441869a55827d3c15daea0",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should do something", async () => {
            // Arrange
            const contract = await getContract(params.verifiedContract, {
                chainId: params.chainId,
                apiKey: params.apiKey
            });
            const expectedName: string = "Wrapped Fantom"

            // Act 
            contract.setProvider(new Web3.providers.HttpProvider(params.rpc));
            const actualName: string = await contract.methods.name().call();

            // Assert
            expect(true).toBeTruthy();
        });
    });
});
