import { core } from "web3";
import { ContractPlugin } from "../src";
import { ChainID, getAPIKey, getNetworkNameFromChainID, getRPC } from "../src/chains";

describe("Etherscan Tests", () => {
  const SECONDS = 1000;
  require('dotenv').config();

  beforeEach(() => {
    jest.setTimeout(20 * SECONDS)
  });

  describe(`${getNetworkNameFromChainID(ChainID.ETHEREUM_MAINNET)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.ETHEREUM_MAINNET;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        proxyContract: "0x87887cf0e37d937f989ab76b99e4f4682da044c4",
        unverifiedContract: "0x0000000000000000000000000000000000000000"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedName: string = "Uniswap";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
      const actualName = await contract.methods.name().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(actualName).toEqual(expectedName);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedName: string = "Gnosis Safe";  // This may change in the future
      const owner = params.proxyContract

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.proxyContract); // Pass an empty object as the second argument
      const actualName = await contract.methods.NAME().call();
      // const acutalIsOwner = await contract.methods.isOwner(owner).call();
      // console.log(acutalIsOwner)

      // Assert
      expect(contract).not.toBeNull();
      expect(actualName).toEqual(expectedName);
    });

    it("should throw an error for unverified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin(params.apiKey));
        await web3Context.contractPlugin.contract(params.unverifiedContract);
      }).rejects.toThrow(/not verified/);
    });

    /**
     * Proxy contract will trigger two API calls, which will exceed the free tier limit hence throw an error
     */
    it("should throw an error for missing APIKey", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin());
        await web3Context.contractPlugin.contract(params.proxyContract);
      }).rejects.toThrow();
    });
  });

  describe(`${getNetworkNameFromChainID(ChainID.BASE_MAINNET)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.BASE_MAINNET;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
        proxyContract: "0xd8ac7f696ae99cd7b689726cf03c5711dd8dcdb4",
        unverifiedContract: "0x0000000000000000000000000000000000000000"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedl1Token: string = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
      const actuall1Token: string = await contract.methods.l1Token().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedl1Token).toEqual(actuall1Token);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedOwner: string = "0x2475039bF2ECDCe2EE4C82954e64bE9674f43546";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.proxyContract);
      const actualOwner: string = await contract.methods.owner().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedOwner).toEqual(actualOwner);
    });

    it("should throw an error for unverified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin(params.apiKey));
        await web3Context.contractPlugin.contract(params.unverifiedContract);
      }).rejects.toThrow(/not verified/);
    });

    /**
     * Proxy contract will trigger two API calls, which will exceed the free tier limit hence throw an error
     */
    it("should throw an error for missing APIKey", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin());
        await web3Context.contractPlugin.contract(params.proxyContract);
      }).rejects.toThrow();
    });
  });

  describe(`${getNetworkNameFromChainID(ChainID.POLYGON_MUMBAI)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.POLYGON_MUMBAI;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0x7f092e65c688a509737fcd8d0998dd12208f5297",
        proxyContract: "0xf9bf9e70071c830f65441869a55827d3c15daea0",
        unverifiedContract: "0x0000000000000000000000000000000000001010"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedOwner: string = "0x907f2e1F4A477319A700fC9a28374BA47527050e";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
      const actualOwner: string = await contract.methods.admin().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedOwner).toEqual(actualOwner);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedComptroller: string = "0x8e3a710a084395CEd2E674bE882775C53A8494F9";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.proxyContract);
      const actualComptroller: string = await contract.methods.comptroller().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedComptroller).toEqual(actualComptroller);
    });

    it("should throw an error for unverified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin(params.apiKey));
        await web3Context.contractPlugin.contract(params.unverifiedContract);
      }).rejects.toThrow(/not verified/);
    });
  });

  describe(`${getNetworkNameFromChainID(ChainID.FRAXSCAN_MAINNET)} Test`, () => {
    let params: {
      chainId: string
      rpc: string,
      apiKey?: string
      verifiedContract: string
      proxyContract: string
      unverifiedContract: string
    }
    beforeAll(() => {
      const chain = ChainID.FRAXSCAN_MAINNET;
      params = {
        chainId: chain,
        rpc: getRPC(chain),
        apiKey: getAPIKey(chain),
        verifiedContract: "0xfc00000000000000000000000000000000000006",
        proxyContract: "0x4200000000000000000000000000000000000010",
        unverifiedContract: "0x0000000000000000000000000000000000001010"
      }
    });

    it("should create a contract instance for verified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedName: string = "Wrapped Frax Ether";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.verifiedContract);
      const actualName: string = await contract.methods.name().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedName).toEqual(actualName);
    });

    it("should create the implementation contract instance for a proxy contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);
      const expectedL1TokenBridge: string = "0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2";

      // Act
      web3Context.registerPlugin(new ContractPlugin(params.apiKey));
      const contract = await web3Context.contractPlugin.contract(params.proxyContract);
      const actualL1TokenBridge: string = await contract.methods.l1TokenBridge().call();

      // Assert
      expect(contract).not.toBeNull();
      expect(expectedL1TokenBridge).toEqual(actualL1TokenBridge);
    });

    it("should throw an error for unverified smart contract", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin(params.apiKey));
        await web3Context.contractPlugin.contract(params.unverifiedContract);
      }).rejects.toThrow(/not verified/);
    });

    /**
     * Proxy contract will trigger two API calls, which will exceed the free tier limit hence throw an error
     */
    it("should throw an error for missing APIKey", async () => {
      // Arrange
      const web3Context = new core.Web3Context(params.rpc);

      // Act & Assert
      await expect(async () => {
        web3Context.registerPlugin(new ContractPlugin());
        await web3Context.contractPlugin.contract(params.proxyContract);
      }).rejects.toThrow();
    });
  });
});
