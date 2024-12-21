import { getAPI } from "../chains"
import { BaseScan } from "./base"
import { ExplorerInterface } from "./explorer-service"

export class EtherScanV2Client extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getSourceCodeEndpoint(address: string): string {
        return `v2/api?chainid=${this.chainId}&module=contract&action=getsourcecode&address=${address}`
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
}