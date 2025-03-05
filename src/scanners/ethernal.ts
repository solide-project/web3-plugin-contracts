import { ChainID } from "../../src/chains"
import { BaseScan } from "./base"
import {
    EthGetSourceCodeInterface, ExplorerInterface,
    generateSourceCodeError
} from "./explorer-service"

export class EthernalClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `api/contracts/${address}?firebaseUserId=4SLyFFkgeJeePC39HgcRLLfy1qp1&workspace=${this.getWorksapce()}`
    }

    getWorksapce(): string {
        switch (this.chainId) {
            case ChainID.COTI_DEVNET:
                return "unsightly-mango-air"
            case ChainID.COTI_TESTNET:
            default:
                return "COTI+Testnet"
        }
    }


    async call(address: string): Promise<any> {
        const apiUrl: string = this.getsourcecodeURL(address)
        if (!apiUrl) {
            return generateSourceCodeError("API Endpoint not found")
        }

        const response = await fetch(apiUrl)
        if (!response || !response.ok) {
            return generateSourceCodeError("Error fetching contract")
        }

        let data = (await response.json()) as EthGetSourceCodeInterface
        return data
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        let data = await this.call(address)

        if (data.data?.implementation) {
            data = await this.call(data.data?.implementation || address)
        }

        return await this.convert(data, address)
    }

    async convert(
        data: any,
        address: string
    ): Promise<EthGetSourceCodeInterface> {
        if (!data || !data.verification) {
            return {
                status: "0",
                message: "NOTOK",
                result: "Contract not verified",
            }
        }

        let sourceInput: any = {
            sources: {},
        }
        if (data.verification?.sources) {
            data.verification.sources.forEach((source: any) => {
                sourceInput.sources[source.fileName] = { content: source.content }
            })
        }

        return {
            status: "1",
            message: "OK",
            result: [
                {
                    SourceCode: `{${JSON.stringify(sourceInput)}}`,
                    ABI: JSON.stringify(data.abi) || "[]",
                    ContractName: data.verification?.contractName || "",
                    CompilerVersion: data.verification?.compilerVersion || "0",
                    OptimizationUsed: data.verification?.optimizationUsed || "0",
                    Runs: data.verification?.runs || "200",
                    ConstructorArguments: data.verification?.constructorArguments || "",
                    EVMVersion: data.verification?.evmVersion || "default",
                    Library: data.verification?.libraries || "{}",
                    LicenseType: "None",
                    Proxy: "",
                    Implementation: data.proxyContract || "[]",
                    SwarmSource: "",
                },
            ],
        }
    }
}