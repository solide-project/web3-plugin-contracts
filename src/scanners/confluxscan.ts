import { isAddress } from "web3-validator"
import { BaseScan } from "./base"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"

export class ConfluxScanClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        let data: EthGetSourceCodeInterface = await this.call(address)
        if (data.status === "0") {
            return data
        }

        const result = data.result[0] as any;
        if (isAddress(result.Implementation)) {
            data = await this.call(result.Implementation)
        }

        if (data.result && data.result[0] && typeof data.result[0] === "object") {
            const compilationTarget = data.result[0].ContractName.split(":")
            data.result[0].ContractName = this.appendExtension(
                compilationTarget[1] || compilationTarget[0]
            )
        }

        return data
    }
}