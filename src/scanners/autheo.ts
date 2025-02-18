import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"
import { getAPI } from "../chains"
import { Explorer } from "../chains/service"
import { solcVersion } from "../solidity"

export class AutheoClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `/api/v2/smart-contracts/${address}`
    }

    getsourcecodeURL(address: string): string {
        const apiUrl: string = getAPI(this.chainId, Explorer.BLOCKSCOUT)
        if (!apiUrl) {
            return ""
        }

        let uri = `${apiUrl}/${this.getSourceCodeEndpoint(address)}`
        // const apiKey = getAPIKey(this.chainId)
        if (this.apiKey) {
            uri = uri.concat(`&apikey=${this.apiKey}`)
        }

        return uri
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        let data: EthGetSourceCodeInterface = await this.call(address)

        if (data.status === "0") {
            return data
        }

        // TODO: Handle Proxy

        return await this.convert(data, address)
    }

    async convert(
        data: any,
        address: string
    ): Promise<EthGetSourceCodeInterface> {
        if (data.message) {
            return generateSourceCodeError(data.message)
        }

        const contractName = this.appendExtension(data.name)

        let results: any = this.generateDefaultResult()
        let sourceInput: any = {
            sources: {},
        }

        sourceInput.sources[data.file_path] = {
            content: data.source_code,
        }

        if (data.additional_sources) {
            data.additional_sources.forEach(
                (element: { file_path: string; source_code: string }) => {
                    if (element.file_path.startsWith("/")) {
                        element.file_path = element.file_path.slice(1)
                    }

                    sourceInput.sources[element.file_path] = {
                        content: element.source_code,
                    }
                }
            )
        }

        results.SourceCode = `{${JSON.stringify(sourceInput)}}`
        results.ABI = data.abi ? JSON.stringify(data.abi) : "[]"
        results.Language = "Solidity"
        results.ContractName = contractName
        results.CompilerVersion = data.compiler_version || solcVersion
        results.OptimizationUsed = data.compiler_settings?.optimizer?.enabled ? "1" : "0"
        results.Runs = data.compiler_settings?.optimizer?.runs || "200"

        return {
            status: "1",
            message: "OK",
            result: [results],
        }
    }
}