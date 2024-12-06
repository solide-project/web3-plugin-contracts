import { ChainID } from "./chain-id"
import { Explorer } from "./service"

export const data: { [key: string]: string | { [key: string]: string } } = {
  [ChainID.ETHEREUM_MAINNET]: "https://api.etherscan.io",
  [ChainID.ETHEREUM_GOERLI]: "https://api-goerli.etherscan.io",
  [ChainID.ETHEREUM_SEPOLIA]: "https://api-sepolia.etherscan.io",
  [ChainID.ETHEREUM_HOLESKY]: "https://api-holesky.etherscan.io",
  [ChainID.METIS_ANDROMEDA]: "https://andromeda-explorer.metis.io",
  [ChainID.METIS_SEPOLIA]: "https://sepolia.explorer.metisdevops.link",
  [ChainID.ARBITRUM_ONE]: "https://api.arbiscan.io",
  [ChainID.ARBITRUM_GOERLI]: "https://api-goerli.arbiscan.io",
  [ChainID.ARBITRUM_NOVA]: "https://api-nova.arbiscan.io",
  [ChainID.OASIS_EMERALD]: "https://explorer.emerald.oasis.dev",
  [ChainID.OASIS_SAPPHIRE]: "https://explorer.sapphire.oasis.io",
  [ChainID.OASIS_SAPPHIRE_TESTNET]:
    "https://testnet.explorer.sapphire.oasis.dev",
  [ChainID.IMMUTABLE_MAINNET]: "https://explorer.immutable.com",
  [ChainID.IMMUTABLE_TESTNET]: "https://explorer.testnet.immutable.com",
  [ChainID.AVALANCHE_MAINNET]:
    "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
  [ChainID.AVALANCHE_FUJI]:
    "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
  [ChainID.POLYGON_MAINNET]: "https://api.polygonscan.com",
  [ChainID.POLYGON_MUMBAI]: "https://api-mumbai.polygonscan.com",
  [ChainID.OPTIMISM_MAINNET]: "https://api-optimistic.etherscan.io",
  [ChainID.OPTIMISM_SEPOLIA]: "https://api-goerli-optimistic.etherscan.io",
  [ChainID.FANTOM_MAINNET]: "https://api.ftmscan.com",
  [ChainID.FANTOM_TESTNET]: "https://api-testnet.ftmscan.com",
  [ChainID.BASE_MAINNET]: "https://api.basescan.org",
  [ChainID.BASE_SEPOLIA]: "https://api-sepolia.basescan.org",
  [ChainID.BNB_MAINNET]: "https://api.bscscan.com",
  [ChainID.BNB_TESTNET]: "https://api-testnet.bscscan.com",
  [ChainID.LINEA_MAINNET]: "https://api.lineascan.build",
  [ChainID.LINEA_TESTNET]: "https://api-testnet.lineascan.build",
  [ChainID.MOONBEAM_MAINNET]: "https://api-moonbeam.moonscan.io",
  [ChainID.MOONBASE_ALPHA]: "https://api-moonbase.moonscan.io",
  [ChainID.MOONRIVER_MAINNET]: "https://api-moonriver.moonscan.io",
  [ChainID.CELO_MAINNET]: "https://api.celoscan.io",
  [ChainID.CELO_ALFAJORES]: "https://api-alfajores.celoscan.io",
  [ChainID.GNOSIS_MAINNET]: "https://api.gnosisscan.io",
  [ChainID.CRONOS_MAINNET]: "https://api.cronoscan.com",
  [ChainID.SCROLL_MAINNET]: "https://api.scrollscan.com",
  [ChainID.SCROLL_SEPOLIA]: "https://api-sepolia.scrollscan.com",
  [ChainID.MANTLE_MAINNET]: "https://explorer.mantle.xyz",
  [ChainID.MANTLE_TESTNET]: "https://explorer.testnet.mantle.xyz",
  [ChainID.BITTORRENT_MAINNET]: "https://api.bttcscan.com",
  [ChainID.BITTORRENT_TESTNET]: "https://api-testnet.bttcscan.com",
  [ChainID.XDC_MAINNET]: "https://xdc.blocksscan.io",
  [ChainID.CANTO_MAINNET]: "https://explorer.plexnode.wtf",
  [ChainID.CANTO_TESTNET]: "https://testnet.tuber.build",
  [ChainID.KAVA_MAINNET]: "https://kavascan.com",
  [ChainID.KAVA_TESTNET]: "https://testnet.kavascan.com",
  [ChainID.ROLLUX_MAINNET]: "https://explorer.rollux.com",
  [ChainID.ROLLUX_TESTNET]: "https://rollux.tanenbaum.io",
  [ChainID.SYSCOIN_MAINNET]: "https://explorer.syscoin.org",
  [ChainID.SYSCOIN_TESTNET]: "https://tanenbaum.io",
  [ChainID.BOBA_ETHEREUM]:
    "https://api.routescan.io/v2/network/mainnet/evm/288/etherscan",
  [ChainID.MANTA_PACIFIC]: "https://pacific-explorer.manta.network",
  [ChainID.MANTA_TESTNET]: "https://pacific-explorer.testnet.manta.network",
  [ChainID.WEMIX_MAINNET]: "https://api.wemixscan.com",
  [ChainID.WEMIX_TESTNET]: "https://api-testnet.wemixscan.com",
  [ChainID.ASTAR_MAINNET]: "https://blockscout.com/astar",
  [ChainID.SHIDEN_MAINNET]: "https://blockscout.com/shiden",
  [ChainID.SHUBIYA_TESTNET]: "https://blockscout.com/shibuya",
  [ChainID.ZETACHAIN_MAINNET]: "https://zetachain.blockscout.com",
  [ChainID.ZETACHAIN_TESTNET]: "https://zetachain-athens-3.blockscout.com",
  [ChainID.FLARE_MAINNET]: "https://flare-explorer.flare.network",
  [ChainID.FLARE_COSTON]: "https://coston-explorer.flare.network",
  [ChainID.FLARE_COSTON2]: "https://coston2-explorer.flare.network",
  [ChainID.FUSE_MAINNET]: "https://explorer.fuse.io",
  [ChainID.FUSE_SPARK]: "https://explorer.fusespark.io",
  [ChainID.SHIBARIUM_MAINNET]: "https://www.shibariumscan.io",
  [ChainID.PUPPYNET_TESTNET]: "https://puppyscan.shib.io",
  [ChainID.CONFLUX_MAINNET]: "https://evmapi.confluxscan.io",
  [ChainID.CONFLUX_TESTNET]: "https://evmapi-testnet.confluxscan.net",
  [ChainID.FILECOIN_MAINNET]: "https://fvm-api.starboard.ventures",
  [ChainID.FILECOIN_CALIBRATION]:
    "https://fvm-calibration-api.starboard.ventures",
  [ChainID.ENERGY_WEB_CHAIN]: "https://explorer.energyweb.org",
  [ChainID.ENERGY_WEB_CHAIN_TESTNET]: "https://explorer.testnet.energyweb.org",
  [ChainID.LUKSO_MAINNET]:
    "https://api.explorer.execution.mainnet.lukso.network",
  [ChainID.LUKSO_TESTNET]:
    "https://api.explorer.execution.testnet.lukso.network",
  [ChainID.ACALA_MAINNET]: "https://blockscout.acala.network",
  [ChainID.MANDALA_TESTNET]: "https://blockscout.mandala.aca-staging.network",
  [ChainID.REI_MAINNET]: "https://scan.rei.network",
  [ChainID.REI_TESTNET]: "https://scan-test.rei.network",
  [ChainID.ZORA_NETWORK_MAINNET]: "https://explorer.zora.energy",
  [ChainID.ZORA_NETWORK_TESTNET]: "https://sepolia.explorer.zora.energy",
  [ChainID.CALLISTO_MAINNET]: "https://explorer.callisto.network",
  [ChainID.ZKSYNC_MAINNET]: "https://block-explorer-api.mainnet.zksync.io",
  [ChainID.ZKSYNC_SEPOLIA]: "https://block-explorer-api.mainnet.zksync.io",
  [ChainID.NEON_MAINNET]: "https://neon.blockscout.com",
  [ChainID.NEON_TESTNET]: "https://neon-devnet.blockscout.com",
  [ChainID.AURORA_MAINNET]: "https://old.explorer.aurora.dev",
  [ChainID.AURORA_TESTNET]: "https://explorer.old.testnet.aurora.dev",
  [ChainID.RONIN_MAINNET]: "https://explorer-kintsugi.roninchain.com",
  [ChainID.RONIN_SAIGON_TESTNET]: "https://explorer-kintsugi.roninchain.com",
  [ChainID.TRON_MAINNET]:
    "https://apilist.tronscanapi.com/api/solidity/contract/info",
  [ChainID.TRON_NILE_TESTNET]:
    "https://nileapi.tronscan.org/api/solidity/contract/info",
  [ChainID.TRON_SHASTA_TESTNET]:
    "https://shastapi.tronscan.org/api/solidity/contract/info",
  [ChainID.BEAM_MAINNET]:
    "https://api.routescan.io/v2/network/mainnet/evm/4337/etherscan",
  [ChainID.CARBON_EVM_MAINNET]: "https://evm-scan.carbon.network",
  [ChainID.CARBON_EVM_TESTNET]: "https://test-evm-scan.carbon.network",
  [ChainID.ARTELA_TESTNET]: "https://betanet-scan.artela.network",
  [ChainID.BERACHAIN_TESTNET]: "https://api.routescan.io/v2/network/testnet/evm/80085/etherscan",
  [ChainID.VICTION_MAINNET]: "https://www.vicscan.xyz",
  [ChainID.VICTION_TESTNET]: "https://scan-api-testnet.viction.xyz",
  [ChainID.PALM_MAINNET]: "https://sourcify.sirato.xyz/mesh/11297108109",
  [ChainID.PALM_TESTNET]: "https://sourcify.sirato.xyz/mesh/11297108099",
  [ChainID.METER_MAINNET]: "https://api.meter.io:8000/api/cfile",
  [ChainID.METER_TESTNET]: "https://api.meter.io:4000/api/cfile",
  [ChainID.PUBLIC_GOOD_NETWORK]: "https://explorer.publicgoods.network",
  [ChainID.PUBLIC_GOOD_NETWORK_SEPOLIA]: "https://explorer.sepolia.publicgoods.network",
  [ChainID.ROOTSTOCK_MAINNET]: "https://rootstock.blockscout.com",
  [ChainID.ROOTSTOCK_TESTNET]: "https://rootstock-testnet.blockscout.com",
  [ChainID.LIGHTLINK_PHOENIX_MAINNET]: "https://phoenix.lightlink.io",
  [ChainID.LIGHTLINK_PEGASUS_TESTNET]: "https://pegasus.lightlink.io",
  [ChainID.ETHERLINK_MAINNET]: "https://explorer.etherlink.com",
  [ChainID.ETHERLINK_TESTNET]: "https://testnet.explorer.etherlink.com",
  [ChainID.VELAS_MAINNET]: "https://evmexplorer.velas.com",
  [ChainID.MODE_MAINNET]: "https://explorer.mode.network",
  [ChainID.MODE_SEPOLIA]: "https://sepolia.explorer.mode.network",
  [ChainID.MORPH_TESTNET]: "https://explorer-testnet.morphl2.io",
  [ChainID.BLAST_MAINNET]: "https://blastscan.io",
  [ChainID.BLAST_SEPOLIA]: "https://sepolia.blastscan.io",
  [ChainID.SYNDICATE_FRAME_MAINNET]: "https://explorer-frame.syndicate.io",
  [ChainID.DOS_MAINNET]: "https://doscan.io",
  [ChainID.DOS_TESTNET]: "https://test.doscan.io",
  [ChainID.DEGEN_MAINNET]: "https://explorer.degen.tips",
  [ChainID.TAIKO_MAINNET]: "	https://api.taikoscan.io",
  [ChainID.TAIKO_HEKLA_TESTNET]: "https://api-hekla.taikoscan.io",
  [ChainID.TAIKO_KATLA_TESTNET]: "https://explorer.katla.taiko.xyz",
  [ChainID.SHIMMER_MAINNET]: "https://explorer.evm.shimmer.network",
  [ChainID.SHIMMER_TESTNET]: "https://explorer.evm.testnet.shimmer.network",
  [ChainID.FRAXSCAN_MAINNET]: "https://api.fraxscan.com",
  [ChainID.FRAXSCAN_TESTNET]: "	https://api-holesky.fraxscan.com",
  [ChainID.XRP_SIDECHAIN]: "https://evm-sidechain.xrpl.org",
  [ChainID.CORE_MAINNET]: "https://scan.coredao.org",
  [ChainID.ZKEVM_POLYGON]: "https://api-zkevm.polygonscan.com",
  [ChainID.ZKEVM_POLYGON_CARDONA]: "https://api-testnet-zkevm.polygonscan.com",
  [ChainID.BITLAYER_MAINNET]: "https://api.btrscan.com",
  [ChainID.BITLAYER_TESTNET]: "https://api-testnet.btrscan.com",
  [ChainID.ETHEREUM_CLASSIC_MAINNET]: "https://etc.blockscout.com",
  [ChainID.ETHEREUM_CLASSIC_TESTNET]: "https://etc-mordor.blockscout.com",
  [ChainID.STABILITY_MAINNET]: "https://stability.blockscout.com",
  [ChainID.STABILITY_TESTNET]: "https://stability-testnet.blockscout.com",
  [ChainID.ARBITRUM_SEPOLIA]: "https://api-sepolia.arbiscan.io",
  [ChainID.KROMA_MAINNET]: "https://api-sepolia.arbiscan.io",
  [ChainID.KROMA_SEPOLIA]: "https://api-sepolia.kromascan.com",
  [ChainID.POLYGON_AMOY]: "https://api-amoy.polygonscan.com",
  [ChainID.GNOSIS_CHIADO]: "https://gnosis-chiado.blockscout.com",
  [ChainID.COTI_DEVNET]: "https://ethernal.fly.dev",
  [ChainID.COTI_TESTNET]: "https://ethernal.fly.dev",
  [ChainID.LISK_MAINNET]: "https://blockscout.lisk.com",
  [ChainID.LISK_SEPOLIA]: "https://sepolia-blockscout.lisk.com",
  [ChainID.REDSTONE_MAINNET]: "https://explorer.redstone.xyz",
  [ChainID.REDSTONE_GARNET_TESTNET]: "https://explorer.garnetchain.com",
  [ChainID.OPEN_CAMPUS_CODEX]: "https://opencampus-codex.blockscout.com",
  [ChainID.UNICHAIN_SEPOLIA]: "https://unichain-sepolia.blockscout.com",
  [ChainID.MOVEMENT_IMOLA]: "",
  [ChainID.XAI_GAMES_MAINNET]: "https://api.xaiscan.io",
  [ChainID.XAI_ARB_TESTNET]: "https://api-sepolia.xaiscan.io",
  [ChainID.SONEIUM_TESTNET]: "https://explorer-testnet.soneium.org",
  [ChainID.BLACKFORT_MAINNET]: "https://blackfort.blockscout.com",
  [ChainID.BLACKFORT_TESTNET]: "https://blackfort-testnet.blockscout.com",
  [ChainID.APECHAIN_MAINNET]: "https://apechain.calderaexplorer.xyz",
  [ChainID.APECHAIN_CURTIS_TESTNET]: "https://curtis.explorer.caldera.xyz",
  [ChainID.EDUCHAIN]: "https://educhain.blockscout.com",
  [ChainID.SHAPE_MAINNET]: "https://shapescan.xyz",
  [ChainID.SHAPE_SEPOLIA]: "https://explorer-sepolia.shape.network",
  [ChainID.INK_SEPOLIA]: "https://explorer-sepolia.inkonchain.com",
  [ChainID.WORLD_MAINNET]: "https://api.worldscan.org",
  [ChainID.WORLD_SEPOLIA]: "https://api-sepolia.worldscan.org",
  [ChainID.CHILIZ_CHAIN]: {
    [Explorer.ROUTESCAN]: "https://api.routescan.io/v2/network/mainnet/evm/88888/etherscan",
    [Explorer.BLOCKSCOUT]: "https://scan.chiliz.com",
  },
  [ChainID.CHILIS_SPICY_TESTNET]: {
    [Explorer.ROUTESCAN]: "https://api.routescan.io/v2/network/mainnet/evm/88882/etherscan",
    [Explorer.BLOCKSCOUT]: "https://testnet.chiliscan.com",
  },
}