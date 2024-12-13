import { Explorer } from "."
import { BaseScan } from "./base"
import { BlockScoutClient } from "./blockscout-new"
import {
    generateSourceCodeError, EthGetSourceCodeInterface, ExplorerInterface
} from "./explorer-service"
import { RouteScanClient } from "./routescan"

export class MultiScanClient extends BaseScan implements ExplorerInterface {

    private scanners: BaseScan[]
    constructor(chainId: string, explorer: { [key: string]: string }) {
        super(chainId, "")
        this.scanners = Object.entries(explorer)
            .map(([key, value]) => {
                switch (key) {
                    case Explorer.BLOCKSCOUT:
                        return new BlockScoutClient(chainId, value);
                    case Explorer.ROUTESCAN:
                        return new RouteScanClient(chainId, value);
                    default:
                        return null;
                }
            })
            .filter((scanner): scanner is BaseScan => scanner !== null);
    }

    async getSourceCode(address: string): Promise<EthGetSourceCodeInterface> {
        const wrappedPromises: Promise<EthGetSourceCodeInterface | null>[] = this.scanners.map((scanner) =>
            scanner.getSourceCode(address).then((data) => {
                if (!data.result) {
                    throw new Error(data.message || "Contract not found");
                }

                if (typeof data.result === "string") {
                    throw new Error(data.result);
                }

                if (!data.result[0].ABI || !data.result[0].ABI.startsWith("[")) {
                    throw new Error(data.result[0].ABI || "ABI not found");
                }

                return data;
            }).catch(() => null)
        );

        for (const promise of wrappedPromises) {
            const result = await promise;
            if (result) {
                return result;
            }
        }

        throw generateSourceCodeError("Error fetching contract");
    }
}