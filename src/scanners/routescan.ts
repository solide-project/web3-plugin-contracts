import { Explorer } from "."
import { getAPI } from "../chains"
import { BaseScan } from "./base"
import { ExplorerInterface } from "./explorer-service"

export class RouteScanClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }

    getsourcecodeURL(address: string): string {
        const apiUrl: string = getAPI(this.chainId, Explorer.ROUTESCAN)
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