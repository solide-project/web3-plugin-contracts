import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"
import { getAPI } from "../chains"
import { Explorer } from "../chains/service"
import { metadataLib, solcVersion } from "../solidity"
import path from "path"

export class BlockVisionClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `api/verifyContractV2/data?address=${address}`
    }

    getsourcecodeURL(address: string): string {
        const apiUrl: string = getAPI(this.chainId)
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
        let data = await this.call(address)

        if (data.result?.isProxyContract) {
            data = await this.call(data.result?.implementationAddress || address)
        }

        return await this.convert(data, address)
    }

    async convert(
        data: any,
        address: string
    ): Promise<EthGetSourceCodeInterface> {
        if (data.message && data.message !== "OK") {
            return generateSourceCodeError(data.message)
        }

        const contractName = this.appendExtension(data.result.contractName)

        let results: any = this.generateDefaultResult()
        let sourceInput: any = {
            sources: {},
        }

        if (data.result.metaData.sources) {
            Object.entries(data.result.metaData.sources).map(([key, value]) => {
                const contractName = path.basename(key)

                const content = data.result.contractSourceCode
                    .filter(({ content, name }: { content: string, name: string }) => name === contractName)
                    .pop();

                sourceInput.sources[key] = content || ""
            })
        }

        results.SourceCode = `{${JSON.stringify(sourceInput)}}`
        results.ABI = data.result.contractABI
        results.Language = data.result.metaData.language || "Solidity"
        results.ContractName = contractName
        results.CompilerVersion = data.result.metaData.compiler.version || solcVersion
        sourceInput.settings = metadataLib.settings(data.result.metaData)

        return {
            status: "1",
            message: "OK",
            result: [results],
        }
    }
}