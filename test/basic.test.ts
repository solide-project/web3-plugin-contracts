import Web3, { core } from "web3";
import { ContractPlugin, getContract } from "../src";
import { ChainID, getAPIKey, getRPC } from "../src/chains";

describe("ContractPlugin Tests", () => {
    it("should register TemplatePlugin plugin on Web3Context instance", () => {
        // Arrange
        const chainId = ChainID.ETHEREUM_MAINNET;
        const rpc = getRPC(chainId);
        const web3Context = new core.Web3Context(rpc);

        // Act
        web3Context.registerPlugin(new ContractPlugin());

        // Assert
        expect(web3Context.contractPlugin).toBeDefined();
    });

    it("should register TemplatePlugin plugin on Web3Context instance", () => {
        // Arrange
        const chainId = ChainID.ETHEREUM_MAINNET;
        const rpc = getRPC(chainId);
        const web3Context = new core.Web3Context(rpc);

        const expectResult: string = "pong";

        // Act
        web3Context.registerPlugin(new ContractPlugin());
        const actualResult: string = web3Context.contractPlugin.ping();

        // Assert
        expect(actualResult).toEqual(expectResult);
    });
});

describe("Basic Tests", () => {
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

    it("should create a contract instance for given a chainID and apiKey without provider", async () => {
        // Arrange & Act 
        const contract = await getContract(params.verifiedContract, {
            chainId: params.chainId,
            apiKey: params.apiKey
        });

        // Assert 
        // Since we can't call these without a provider, we can only check if they exist
        expect(contract).not.toBeNull();
        expect(contract.methods.balanceOf).not.toBeNull();
        expect(contract.methods.balanceOfFake).toBeNull();
        expect(contract.methods.approve).not.toBeNull();
        expect(contract.methods.approveTwo).toBeNull();
    });

    it("should throw error for a contract instance without provider", async () => {
        // Arrange
        const contract = await getContract(params.verifiedContract, {
            chainId: params.chainId,
            apiKey: params.apiKey
        });

        // Act & Assert
        await expect(async () => {
            const name = await contract.methods.name().call();
        }).rejects.toThrow();
    });

    it("should not throw error for a contract instance without provider", async () => {
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
        expect(contract).not.toBeNull();
        expect(actualName).not.toBeNull();
        expect(actualName).toEqual(expectedName);
    });
});