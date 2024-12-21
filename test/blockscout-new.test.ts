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

    describe(`${getNetworkNameFromChainID(ChainID.SHIMMER_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.SHIMMER_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0xb9F296bC947d55D7eDD0627C428891B7331Ef2c2",
                proxyContract: "0x699eB64887eaC65D775d95288de5a0eE25c44259",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedInit: boolean = true;

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualInit: boolean = await contract.methods.initialized().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualInit).toEqual(expectedInit);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedAccessControlManager: string = "0xf32c0fb28dbc1171e4E01168A02275242df34483";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualAccessControlManager: string = await contract.methods.accessControlManager().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualAccessControlManager).toEqual(expectedAccessControlManager);
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

    describe(`${getNetworkNameFromChainID(ChainID.OPEN_CAMPUS_CODEX)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.OPEN_CAMPUS_CODEX;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x345E902846aC3805719483d80D664ABa0B6aF40C",
                proxyContract: "0xf4D4a4f8B3F4799E7206511F1A2E112cB2329687",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Wrapped EDU";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualName: boolean = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "NODEKEY";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualSymbol: string = await contract.methods.symbol().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualSymbol).toEqual(expectedSymbol);
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

    describe(`${getNetworkNameFromChainID(ChainID.EDUCHAIN)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.EDUCHAIN;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x435D669eFe1b328F4BA9c24BFBA91b053B34FdEe",
                proxyContract: "0xD9C2Ff6DBD04A9Ed4d3EFdeD68Bd3766D16de26C",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedName: string = "Grasp";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualName: boolean = await contract.methods.name().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualName).toEqual(expectedName);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSigner: string = "0x278bD24A8B65D34bBF0a5b0D4b5510C2135d8f84";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualSigner: string = await contract.methods.signer().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualSigner).toEqual(expectedSigner);
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

    describe(`${getNetworkNameFromChainID(ChainID.SHAPE_MAINNET)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.SHAPE_MAINNET;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x31eDFF898A00BCF4fE86B8b6A304b2585172ebd9",
                proxyContract: "0x139608ABeE12Ff39FEDae39C493B571A25995E10",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedOwner: string = "0x54D9Cf7C39897446F9Eb8Ead6016d3C452077327";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualOwner: boolean = await contract.methods.owner().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(expectedOwner).toEqual(actualOwner);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "RARI";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualSymbol: string = await contract.methods.symbol().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualSymbol).toEqual(expectedSymbol);
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

    describe(`${getNetworkNameFromChainID(ChainID.INK_SEPOLIA)} Test`, () => {
        let params: {
            chainId: string
            rpc: string,
            apiKey?: string
            verifiedContract: string
            proxyContract: string
            unverifiedContract: string
        }
        beforeAll(() => {
            const chain = ChainID.INK_SEPOLIA;
            params = {
                chainId: chain,
                rpc: getRPC(chain),
                apiKey: getAPIKey(chain),
                verifiedContract: "0x92f0A35B5b94F3C7674FD562c88539845B913465",
                proxyContract: "0x4200000000000000000000000000000000000015",
                unverifiedContract: "0x0000000000000000000000000000000000000000"
            }
        });

        it("should create a contract instance for verified smart contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedOwner: string = "Hello, Ink!";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
            const actualOwner: boolean = await contract.methods.greeting().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(expectedOwner).toEqual(actualOwner);
        }, 30 * SECONDS);

        it("should create the implementation contract instance for a proxy contract", async () => {
            // Arrange
            const web3Context = new core.Web3Context(params.rpc);
            const expectedSymbol: string = "RARI";

            // Act
            web3Context.registerPlugin(new ContractPlugin());
            const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
            const actualSymbol: string = await contract.methods.symbol().call();

            // Assert
            expect(contract).not.toBeNull();
            expect(actualSymbol).toEqual(expectedSymbol);
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
