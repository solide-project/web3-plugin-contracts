import { Explorer } from "../chains/service";
import { ChainID } from "../chains";
import { BlockScoutClient } from "./blockscout-new";
import { BlockScoutOldClient } from "./blockscout-old";
import { BlocksScanClient } from "./blocksscan";
import { BTRScanClient } from "./btrscan";
import { ChainLensClient } from "./chain-lens";
import { ConfluxScanClient } from "./confluxscan";
import { CoreScanClient } from "./core-scan";
import { EthernalClient } from "./ethernal";
import { EtherScanClient } from "./etherscan";
import { EtherScanV2Client } from "./etherscan-v2";
import { ExplorerInterface } from "./explorer-service";
import { FilScanClient } from "./filscan";
import { MultiScanClient } from "./multiscan";
import { RoninChainClient } from "./roninchain";
import { TronScanClient } from "./tronscan";
import { VicScanClient } from "./vicscan";
import { AbstractClient } from "./abstract";
import { AutheoClient } from "./autheo";
import { BlockVisionClient } from "./blockvision";

export interface ScannerParams {
    chainId: string
    explorer?: string
    apiKey?: string
}
export const getScanner = ({
    chainId,
    explorer = "",
    apiKey = ""
}: ScannerParams): ExplorerInterface | undefined => {
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
        case ChainID.EPHEMERY_TESTNET:
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
        case ChainID.MORPH:
        case ChainID.MORPH_TESTNET:
        case ChainID.SYNDICATE_FRAME_MAINNET:
        case ChainID.DOS_MAINNET:
        case ChainID.DOS_TESTNET:
        case ChainID.DEGEN_MAINNET:
        case ChainID.TAIKO_KATLA_TESTNET:
        case ChainID.SHIMMER_MAINNET:
        case ChainID.SHIMMER_TESTNET:
        case ChainID.XRP_SIDECHAIN:
        case ChainID.ETHEREUM_CLASSIC_MAINNET:
        case ChainID.ETHEREUM_CLASSIC_TESTNET:
        case ChainID.STABILITY_MAINNET:
        case ChainID.STABILITY_TESTNET:
        case ChainID.LISK_MAINNET:
        case ChainID.LISK_SEPOLIA:
        case ChainID.REDSTONE_MAINNET:
        case ChainID.REDSTONE_GARNET_TESTNET:
        case ChainID.OPEN_CAMPUS_CODEX:
        // APECHAIN currently using blockscout, but could move to etherscan
        case ChainID.APECHAIN_MAINNET:
        case ChainID.APECHAIN_CURTIS_TESTNET:
        case ChainID.EDUCHAIN:
        case ChainID.SHAPE_MAINNET:
        case ChainID.SHAPE_SEPOLIA:
        case ChainID.INK:
        case ChainID.INK_SEPOLIA:
        case ChainID.STACK:
        case ChainID.STACK_TESTNET:
        case ChainID.HEMI_TESTNET:
        case ChainID.MINT:
        case ChainID.MINT_SEPOLIA:
        case ChainID.TABI_TESTNET:
        case ChainID.SUPERPOSITION:
        case ChainID.SUPERPOSITION_TESTNET:
        case ChainID.SWELLCHAIN:
        case ChainID.SWELLCHAIN_TESTNET:
        case ChainID.PLUME:
        case ChainID.PLUME_TESTNET:
        case ChainID.DARWINIA:
        case ChainID.DARWINIA_CRAB:
        case ChainID.ANCIENT_8:
        case ChainID.ANCIENT_8_TESTNET:
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
        case ChainID.TRON_NILE_TESTNET:
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
        case ChainID.CORE_MAINNET:
            return new CoreScanClient(chainId, apiKey)
        case ChainID.BITLAYER_MAINNET:
        case ChainID.BITLAYER_TESTNET:
            return new BTRScanClient(chainId, apiKey)
        case ChainID.COTI_DEVNET:
        case ChainID.COTI_TESTNET:
            return new EthernalClient(chainId, apiKey)
        case ChainID.CHILIZ:
        case ChainID.CHILIZ_SPICY_TESTNET:
            return new MultiScanClient(chainId, {
                [Explorer.BLOCKSCOUT]: apiKey,
                [Explorer.ROUTESCAN]: apiKey,
            })
        case ChainID.SONIC:
        case ChainID.SONIC_TESTNET:
            return new EtherScanV2Client(chainId, apiKey)
        case ChainID.ABSTRACT_TESTNET:
            return new AbstractClient(chainId, apiKey)
        case ChainID.AUTHEO_TESTNET:
            return new AutheoClient(chainId, apiKey)
        case ChainID.MONAD_TESTNET:
        case ChainID.BOUNCEBIT:
        case ChainID.BOUNCEBIT_TESTNET:
            return new BlockVisionClient(chainId, apiKey)
        default:
            return new EtherScanClient(chainId, apiKey)
    }
}