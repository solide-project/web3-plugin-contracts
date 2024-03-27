import { metadataLib } from "../solidity";
import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"

interface FileMetadata {
    name: string;
    /**
     * path are typically formatted as /home/app/repository/contracts/full_match/${chainId}/${address}/metadata.json",
     */
    path: string;
    content: string;
}

interface FileResponse {
    status: string;
    files: FileMetadata[];
}

interface FileError {
    error: string;
    message: string;
}

export class ChainLensClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string) {
        super(chainId)
    }

    getSourceCodeEndpoint(address: string): string {
        return `${address}`
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
        if (data.error || data.message) {
            return generateSourceCodeError(data.message)
        }

        data = data as FileResponse;
        let results: any = this.generateDefaultResult()
        let sourceInput: any = {
            sources: {},
        }

        data.files
            .filter((file: FileMetadata) => file.name.endsWith(".sol"))
            .forEach((file: FileMetadata) => {
                const contractAddress = file.path.indexOf('0x');
                const parts = file.path.substring(contractAddress);

                const paths = parts.split('/').slice(2);
                const contractPath = paths.join('/');
                sourceInput.sources[contractPath || file.path] = {
                    content: file.content,
                }
            })

        results.SourceCode = `{${JSON.stringify(sourceInput)}}`

        const metadataFile: FileMetadata = data.files.filter((file: FileMetadata) => file.name === "metadata.json")[0]

        if (metadataFile) {
            const metadata = JSON.parse(metadataFile.content)

            if (!results.ContractName) {
                results.ContractName = metadataLib.contractName(metadata)
            }
            results.ContractName = this.appendExtension(results.ContractName)

            results.Language = metadataLib.language(metadata)
            results.CompilerVersion = this.formatVersion(
                metadataLib.compilerVersion(metadata))
            results.ABI = metadataLib.abi(metadata)
        }

        return {
            status: "1",
            message: "OK",
            result: [results],
        }
    }
}