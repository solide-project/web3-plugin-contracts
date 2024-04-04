import { ChainID } from "../chains";
import { BlockScoutClient } from "./blockscout-new";
import { BlockScoutOldClient } from "./blockscout-old";
import { BlocksScanClient } from "./blocksscan";
import { ChainLensClient } from "./chain-lens";
import { ConfluxScanClient } from "./confluxscan";
import { EtherScanClient } from "./etherscan";
import { ExplorerInterface } from "./explorer-service";
import { FilScanClient } from "./filscan";
import { RoninChainClient } from "./roninchain";
import { TronScanClient } from "./tronscan";
import { VicScanClient } from "./vicscan";

export const getScanner = (chainId: string, apiKey: string = ""): ExplorerInterface | undefined => {
    switch (chainId) {
        case ChainID.METIS_ANDROMEDA:
        case ChainID.METIS_SEPOLIA:
        case ChainID.MANTLE_MAINNET:
        case ChainID.MANTLE_TESTNET:
        case ChainID.KAVA_MAINNET:
        case ChainID.KAVA_TESTNET:
        case ChainID.ROLLUX_MAINNET:
        case ChainID.ROLLUX_TESTNET:
        case ChainID.CANTO_TESTNET:
        case ChainID.ASTAR_MAINNET:
        case ChainID.ACALA_MAINNET:
        case ChainID.MANDALA_TESTNET:
        case ChainID.REI_MAINNET:
        case ChainID.REI_TESTNET:
        case ChainID.CALLISTO_MAINNET:
        case ChainID.OASIS_EMERALD:
        case ChainID.OASIS_SAPPHIRE:
        case ChainID.OASIS_SAPPHIRE_TESTNET:
        case ChainID.FLARE_MAINNET:
        case ChainID.FLARE_COSTON:
        case ChainID.FLARE_COSTON2:
        case ChainID.VELAS_MAINNET:
            return new BlockScoutOldClient(chainId, apiKey)
        case ChainID.IMMUTABLE_MAINNET:
        case ChainID.IMMUTABLE_TESTNET:
        case ChainID.CANTO_MAINNET:
        case ChainID.MANTA_PACIFIC:
        case ChainID.MANTA_TESTNET:
        // case ChainID.ZETACHAIN_MAINNET:
        case ChainID.ZETACHAIN_TESTNET:
        case ChainID.FUSE_MAINNET:
        case ChainID.FUSE_SPARK:
        case ChainID.ASTAR_MAINNET:
        case ChainID.SHIDEN_MAINNET:
        case ChainID.SHUBIYA_TESTNET:
        case ChainID.LUKSO_MAINNET:
        case ChainID.LUKSO_TESTNET:
        case ChainID.ZORA_NETWORK_MAINNET:
        case ChainID.NEON_MAINNET:
        case ChainID.NEON_TESTNET:
        case ChainID.AURORA_MAINNET:
        case ChainID.AURORA_TESTNET:
        case ChainID.PUBLIC_GOOD_NETWORK:
        case ChainID.PUBLIC_GOOD_NETWORK_SEPOLIA:
        case ChainID.ROOTSTOCK_MAINNET:
        case ChainID.ROOTSTOCK_TESTNET:
        case ChainID.LIGHTLINK_PHOENIX_MAINNET:
        case ChainID.LIGHTLINK_PEGASUS_TESTNET:
        case ChainID.ETHERLINK_TESTNET:
        case ChainID.MODE_MAINNET:
        case ChainID.MODE_SEPOLIA:
        case ChainID.MORPH_TESTNET:
            return new BlockScoutClient(chainId, apiKey)
        case ChainID.XDC_MAINNET:
            return new BlocksScanClient(chainId, apiKey)
        case ChainID.RONIN_MAINNET:
        case ChainID.RONIN_SAIGON_TESTNET:
            return new RoninChainClient(chainId, apiKey)
        case ChainID.CONFLUX_MAINNET:
        case ChainID.CONFLUX_TESTNET:
            return new ConfluxScanClient(chainId, apiKey)
        case ChainID.FILECOIN_MAINNET:
        case ChainID.FILECOIN_CALIBRATION:
            return new FilScanClient(chainId, apiKey)
        case ChainID.TRON_MAINNET:
        case ChainID.TRON_SHASTA_TESTNET:
            return new TronScanClient(chainId, apiKey)
        case ChainID.VICTION_MAINNET:
        case ChainID.VICTION_TESTNET:
            return new VicScanClient(chainId, apiKey)
        case ChainID.PALM_MAINNET:
        case ChainID.PALM_TESTNET:
        case ChainID.METER_MAINNET:
        case ChainID.METER_TESTNET:
            return new ChainLensClient(chainId)
        default:
            return new EtherScanClient(chainId, apiKey)
    }
}