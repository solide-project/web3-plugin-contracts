import { Contract, FMT_BYTES, FMT_NUMBER, Web3PluginBase, eth } from "web3";
import { getScanner } from "./scanners";
import { ChainID } from "./chains";

export class ContractPlugin extends Web3PluginBase {
  public pluginNamespace = "contractPlugin";
  private explorerAPIKey: string = "";

  public constructor(apiKey: string = "") {
    super();
    this.explorerAPIKey = apiKey;
  }

  public async source(contractAddress: string) {
    const chainId = await eth.getChainId(this, {
      number: FMT_NUMBER.NUMBER,
      bytes: FMT_BYTES.HEX,
    });
    return getSource(contractAddress, {
      chainId: chainId.toString(),
      apiKey: this.explorerAPIKey,
    });
  }

  public async contract(contractAddress: string) {
    const chainId = await eth.getChainId(this, {
      number: FMT_NUMBER.NUMBER,
      bytes: FMT_BYTES.HEX,
    });
    const contract = await getContract(contractAddress, {
      chainId: chainId.toString(),
      apiKey: this.explorerAPIKey,
    });
    contract.setProvider(this.currentProvider)

    return contract
  }

  set updateKey(key: string) {
    this.explorerAPIKey = key;
  }

  public ping(): string {
    return "pong";
  }

  private async chainId() {
    const chainResponse = await this.requestManager?.send({
      method: "eth_chainId",
      params: [],
    })
    if (!chainResponse) {
      throw new Error("Chain ID not found")
    }
    return parseInt(chainResponse, 16);
  }
}

export const getSource = async (contractAddress: string, options: ContractPluginOptions) => {
  const scanner = getScanner(options.chainId, options.apiKey);
  if (!scanner) {
    throw new Error("Chain may not be supported")
  }
  return await scanner.getSourceCode(contractAddress)
}

export const getContract = async (contractAddress: string, options: ContractPluginOptions) => {
  const data = await getSource(contractAddress, options);
  if (!data.result) {
    throw new Error(data.message || "Contract not found")
  }

  if (typeof data.result === "string") {
    throw new Error(data.result)
  }

  if (!data.result[0].ABI || !data.result[0].ABI.startsWith("[")) {
    throw new Error(data.result[0].ABI || "ABI not found")
  }

  switch (options.chainId) {
    case ChainID.XDC_MAINNET:
      contractAddress = "0x" + contractAddress.slice(3);

  }
  const abi = JSON.parse(data.result[0].ABI) as any[]
  const contractABI = [...abi] as const;
  const contract = new Contract(
    contractABI,
    contractAddress,
  );

  return contract
}

interface ContractPluginOptions {
  chainId: string;
  apiKey?: string;
  // asProxy?: boolean; // TODO: Get contract as proxy instead of it implementation ABI
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    contractPlugin: ContractPlugin;
  }
}
