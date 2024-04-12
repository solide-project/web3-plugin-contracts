import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"
import { getAPI } from "../chains"
import { solcVersion } from "../solidity"

export class CoreScanClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `/api/chain/abi`
    }

    async call(address: string): Promise<any> {
        const apiUrl: string = this.getsourcecodeURL(address)
        if (!apiUrl) {
            return generateSourceCodeError("API Endpoint not found")
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractAddress: address,
            }),
        })
        if (!response || !response.ok) {
            return generateSourceCodeError("Error fetching contract")
        }

        return await response.json()
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        let data = await this.call(address)
        if (data.data?.isProxy) {
            data = await this.call(data.data?.logicAddress || address)
        }

        return await this.convert(data, address)
    }

    async convert(
        data: any,
        address: string
    ): Promise<EthGetSourceCodeInterface> {
        if (!data.data.id || !data.data.source) {
            return {
                status: "0",
                message: "NOTOK",
                result: data.message || "Error loading contract",
            }
        }

        const contractName = this.appendExtension(data.data?.contractName)

        let results: any = this.generateDefaultResult()
        let sourceInput: any = {
            sources: {},
        }
        await Promise.all(data.data.source.map(async (element: { path: string, name: string }) => {
            if (!element.name) {
                // Single file
                element.name = contractName;
                const response = await fetch(`${getAPI(this.chainId)}${element.path}`);
                if (!response || !response.ok) {
                    return;
                }

                sourceInput.sources[element.name] = {
                    content: await response.text(),
                };
            } else {
                // Multiple files (metadata)
                const response = await fetch(`${getAPI(this.chainId)}${element.path}`);
                if (!response || !response.ok) {
                    return;
                }

                const metadata = await response.json();
                sourceInput.sources = {
                    ...metadata.sources || {}
                };
            }
        }));

        results.SourceCode = `{${JSON.stringify(sourceInput)}}`
        results.ABI = data.data?.abi || "[]"
        results.Language = "Solidity"
        results.ContractName = contractName
        results.CompilerVersion = data.data?.compilerVersion || solcVersion
        results.OptimizationUsed = data.data?.optimization ? "1" : "0"
        results.Runs = data.data?.optimizeRuns ? data.data.optimizeRuns : "200"

        return {
            status: "1",
            message: "OK",
            result: [results],
        }
    }
}