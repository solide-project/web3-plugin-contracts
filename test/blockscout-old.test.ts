import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Blockscout (Old) Tests", () => {
  const SECONDS = 1000;
  require('dotenv').config();

  beforeEach(() => {
    jest.setTimeout(20 * SECONDS)
  });

  describe(`${getNetworkNameFromChainID(ChainID.METIS_ANDROMEDA)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.METIS_ANDROMEDA;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481",     // Wrapped Metis
        proxyContract: "0xdd7c49D1bA862b1285710A30E20C2438b13AE532",
        unverifiedContract: "0x0000000000000000000000000000000000000000"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedName: string = "Wrapped METIS";  // This may change in the future

      // Act
      web3Context.registerPlugin(new ContractPlugin());
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
      const actualName = await contract.methods.name().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(actualName).toEqual(expectedName);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedChainId: string = params.chainId;  // This may change in the future

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
      const actualChainId: bigint = await contract.methods.getChainId().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(typeof actualChainId).toBe("bigint");
      expect(actualChainId.toString()).toEqual(expectedChainId);
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

  describe(`${getNetworkNameFromChainID(ChainID.FLARE_MAINNET)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.FLARE_MAINNET;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0x140D8d3649Ec605CF69018C627fB44cCC76eC89f",     // Helion
        proxyContract: "0xF173c2111F700D485ED7e88CcC488DFF41a9D829",
        unverifiedContract: "0x0000000000000000000000000000000000000000"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedName: string = "Helion";
      const expectedOwner: string = "0xdedda08961216adb9ca09b88986d110127b24270"

      // Act
      web3Context.registerPlugin(new ContractPlugin());
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
      const actualName: string = await contract.methods.name().call();
      const actualOwner: string = await contract.methods.owner().call();

      // // Assert
      expect(contract).not.toBeNull();
      expect(actualName).toEqual(expectedName);
      expect(actualOwner.toLowerCase()).toEqual(expectedOwner.toLowerCase());
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedTokenId: bigint = BigInt(1);

      // Act
      web3Context.registerPlugin(new ContractPlugin());
      const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
      const actualTokenId: bigint = await contract.methods.TOKEN_ID().call();

      // // Assert
      expect(contract).not.toBeNull();
      expect(actualTokenId).toEqual(expectedTokenId);
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

  describe(`${getNetworkNameFromChainID(ChainID.VELAS_MAINNET)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.VELAS_MAINNET;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0xc4ACD115F1CeeBD4A88273423D6CF77C4A1c7559",     // AD2 Token
        proxyContract: "0x24AE61B4a880573fc190a05A407033DA4cd30434",
        unverifiedContract: "0x0000000000000000000000000000000000000000"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedSymbol: string = "AD2";

      // Act
      web3Context.registerPlugin(new ContractPlugin());
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract); // Pass an empty object as the second argument
      const actualSymbol: string = await contract.methods.symbol().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(actualSymbol).toEqual(expectedSymbol);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedHomeFee: bigint = BigInt(1000000000000000);

      // Act
      web3Context.registerPlugin(new ContractPlugin());
      const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
      const actualHomeFee: bigint = await contract.methods.getHomeFee().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(actualHomeFee).toEqual(expectedHomeFee);
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
