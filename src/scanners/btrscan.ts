import { BaseScan } from "./base"
import {
    EthGetSourceCodeInterface, ExplorerInterface,
    generateSourceCodeError
} from "./explorer-service"

export class BTRScanClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `scan/api?module=contract&action=getsourcecode&address=${address}`
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
        if (!data.result || !data.result[0]) {
            return {
                status: "0",
                message: "NOTOK",
                result: data.message || "Error loading contract",
            }
        }

        return {
            status: "1",
            message: "OK",
            result: [
                {
                    SourceCode: data.result[0]?.SourceCode,
                    ABI: data.result[0]?.abi || "[]",
                    ContractName: data.result[0]?.contractName || "",
                    CompilerVersion: data.result[0]?.compilerVersion || "0",
                    OptimizationUsed: data.result[0]?.optimizationUsed || "0",
                    Runs: data.result[0]?.runs || "200",
                    ConstructorArguments: data.result[0]?.constructorArguments || "",
                    EVMVersion: data.evmVersion || "default",
                    Library: data.result[0]?.library || "",
                    LicenseType: data.result[0]?.licenseType || "None",
                    Proxy: data.result[0]?.proxy || "",
                    Implementation: data.result[0]?.implementation || "[]",
                    SwarmSource: data.result[0]?.swarmSource || "",
                },
            ],
        }
    }
}