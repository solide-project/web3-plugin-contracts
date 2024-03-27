import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"

export class BlocksScanClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `api/contracts/${address}`
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        const apiUrl: string = this.getsourcecodeURL(address)
        if (!apiUrl) {
            return generateSourceCodeError("API Endpoint not found")
        }

        const response = await fetch(apiUrl)
        if (!response || !response.ok) {
            return generateSourceCodeError("Error fetching contract")
        }

        return await this.convert(await response.json(), address)
    }

    async convert(
        data: any,
        address: string
    ): Promise<EthGetSourceCodeInterface> {
        if (data.errors || !data.abiCode) {
            return generateSourceCodeError("Error loading contract")
        }

        return {
            status: "1",
            message: "OK",
            result: [
                {
                    SourceCode: data.sourceCode,
                    ABI: data.abiCode,
                    ContractName: data.contractName,
                    CompilerVersion: data.compiler,
                    OptimizationUsed: data.optimization ? "1" : "0",
                    Runs: data.optimizationRuns || "200",
                    ConstructorArguments: data.constructorArguments || "",
                    EVMVersion: data.evmVersion || "default",
                    Library: "",
                    LicenseType: "0",
                    Proxy: "",
                    Implementation: "",
                    SwarmSource: "",
                },
            ],
        }
    }
}