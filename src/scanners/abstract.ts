import { BaseScan } from "./base"
import {
    ExplorerInterface
} from "./explorer-service"

export class AbstractClient extends BaseScan implements ExplorerInterface {
    constructor(chainId: string, apiKey?: string) {
        super(chainId, apiKey)
    }
}