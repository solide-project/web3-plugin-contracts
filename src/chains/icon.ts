import { ChainID } from "./chain-id"

export const getIconByChainId = (chainId: string): string =>
  `https://raw.githubusercontent.com/solide-project/icons/master/crypto/${getIcon(chainId)}`

const getIcon = (chainId: string): string => {
  switch (chainId) {
    case ChainID.ETHEREUM_MAINNET:
    case ChainID.ETHEREUM_GOERLI:
    case ChainID.ETHEREUM_SEPOLIA:
    case ChainID.ETHEREUM_HOLESKY:
      return "eth.svg"
    case ChainID.METIS_ANDROMEDA:
    case ChainID.METIS_SEPOLIA:
      return "metis.svg"
    case ChainID.ARBITRUM_ONE:
    case ChainID.ARBITRUM_GOERLI:
    case ChainID.ARBITRUM_SEPOLIA:
      return "arbitrum.svg"
    case ChainID.ARBITRUM_NOVA:
      return "arbitrum-nova.svg"
    case ChainID.OASIS_EMERALD:
    case ChainID.OASIS_SAPPHIRE:
    case ChainID.OASIS_SAPPHIRE_TESTNET:
      return "rose.svg"
    case ChainID.IMMUTABLE_MAINNET:
    case ChainID.IMMUTABLE_TESTNET:
      return "immutable.svg"
    case ChainID.AVALANCHE_FUJI:
    case ChainID.AVALANCHE_MAINNET:
      return "avax.svg"
    case ChainID.POLYGON_MAINNET:
    case ChainID.POLYGON_MUMBAI:
    case ChainID.POLYGON_AMOY:
    case ChainID.ZKEVM_POLYGON:
    case ChainID.ZKEVM_POLYGON_CARDONA:
      return "polygon.svg"
    case ChainID.OPTIMISM_MAINNET:
    case ChainID.OPTIMISM_SEPOLIA:
      return "optimism.svg"
    case ChainID.FANTOM_MAINNET:
    case ChainID.FANTOM_TESTNET:
      return "fantom.svg"
    case ChainID.BASE_MAINNET:
    case ChainID.BASE_SEPOLIA:
      return "base.svg"
    case ChainID.BNB_MAINNET:
    case ChainID.BNB_TESTNET:
      return "bsc.svg"
    case ChainID.LINEA_MAINNET:
    case ChainID.LINEA_TESTNET:
      return "linea.svg"
    case ChainID.MOONBEAM_MAINNET:
    case ChainID.MOONBASE_ALPHA:
      return "moonbeam.svg"
    case ChainID.MOONRIVER_MAINNET:
      return "moonriver.svg"
    case ChainID.CELO_MAINNET:
    case ChainID.CELO_ALFAJORES:
      return "celo.svg"
    case ChainID.GNOSIS_MAINNET:
    case ChainID.GNOSIS_CHIADO:
      return "gnosis.svg"
    case ChainID.CRONOS_MAINNET:
      return "cronos.svg"
    case ChainID.SCROLL_MAINNET:
    case ChainID.SCROLL_SEPOLIA:
      return "scroll.svg"
    case ChainID.MANTLE_MAINNET:
    case ChainID.MANTLE_TESTNET:
      return "mantle.svg"
    case ChainID.BITTORRENT_MAINNET:
    case ChainID.BITTORRENT_TESTNET:
      return "bttc.svg"
    case ChainID.XDC_MAINNET:
      return "xdc.svg"
    case ChainID.CANTO_MAINNET:
    case ChainID.CANTO_TESTNET:
      return "canto.svg"
    case ChainID.KAVA_MAINNET:
    case ChainID.KAVA_TESTNET:
      return "kava.svg"
    case ChainID.ROLLUX_MAINNET:
    case ChainID.ROLLUX_TESTNET:
      return "rollux.svg"
    case ChainID.SYSCOIN_MAINNET:
    case ChainID.SYSCOIN_TESTNET:
      return "syscoin.svg"
    case ChainID.BOBA_ETHEREUM:
      return "boba.svg"
    case ChainID.MANTA_PACIFIC:
    case ChainID.MANTA_TESTNET:
      return "manta.svg"
    case ChainID.WEMIX_MAINNET:
    case ChainID.WEMIX_TESTNET:
      return "wemix.svg"
    case ChainID.ASTAR_MAINNET:
    case ChainID.SHUBIYA_TESTNET:
      return "astar.svg"
    case ChainID.SHIDEN_MAINNET:
      return "shiden.svg"
    case ChainID.ZETACHAIN_MAINNET:
    case ChainID.ZETACHAIN_TESTNET:
      return "zetachain.svg"
    case ChainID.FLARE_MAINNET:
    case ChainID.FLARE_COSTON:
    case ChainID.FLARE_COSTON2:
      return "flare.svg"
    case ChainID.FUSE_MAINNET:
    case ChainID.FUSE_SPARK:
      return "fuse.svg"
    case ChainID.SHIBARIUM_MAINNET:
    case ChainID.PUPPYNET_TESTNET:
      return "shibarium.svg"
    case ChainID.CONFLUX_MAINNET:
    case ChainID.CONFLUX_TESTNET:
      return "conflux.svg"
    case ChainID.FILECOIN_MAINNET:
    case ChainID.FILECOIN_CALIBRATION:
      return "filecoin.svg"
    case ChainID.ENERGY_WEB_CHAIN:
    case ChainID.ENERGY_WEB_CHAIN_TESTNET:
      return "energyweb.svg"
    case ChainID.LUKSO_MAINNET:
    case ChainID.LUKSO_TESTNET:
      return "lukso.svg"
    case ChainID.ACALA_MAINNET:
    case ChainID.MANDALA_TESTNET:
      return "acala.svg"
    case ChainID.REI_MAINNET:
    case ChainID.REI_TESTNET:
      return "rei.svg"
    case ChainID.ZORA_NETWORK_MAINNET:
    case ChainID.ZORA_NETWORK_TESTNET:
      return "zora.svg"
    case ChainID.CALLISTO_MAINNET:
      return "callisto.svg"
    case ChainID.ZKSYNC_MAINNET:
    case ChainID.ZKSYNC_SEPOLIA:
      return "zksync.svg"
    case ChainID.NEON_MAINNET:
    case ChainID.NEON_TESTNET:
      return "neon.svg"
    case ChainID.AURORA_MAINNET:
    case ChainID.AURORA_TESTNET:
      return "aurora.svg"
    case ChainID.RONIN_MAINNET:
    case ChainID.RONIN_SAIGON_TESTNET:
      return "ronin.svg"
    case ChainID.TRON_MAINNET:
    case ChainID.TRON_NILE_TESTNET:
    case ChainID.TRON_SHASTA_TESTNET:
      return "tron.svg"
    case ChainID.BEAM_MAINNET:
      return "beam.png"
    case ChainID.CARBON_EVM_MAINNET:
    case ChainID.CARBON_EVM_TESTNET:
      return "carbon.svg"
    case ChainID.ARTELA_TESTNET:
      return "artela.svg"
    case ChainID.BERACHAIN_TESTNET:
      return "berachain.svg"
    case ChainID.VICTION_MAINNET:
    case ChainID.VICTION_TESTNET:
      return "viction.svg"
    case ChainID.PALM_MAINNET:
    case ChainID.PALM_TESTNET:
      return "palm.svg"
    case ChainID.METER_MAINNET:
    case ChainID.METER_TESTNET:
      return "meter.svg"
    case ChainID.PUBLIC_GOOD_NETWORK:
    case ChainID.PUBLIC_GOOD_NETWORK_SEPOLIA:
      return "pgn.svg"
    case ChainID.ROOTSTOCK_MAINNET:
    case ChainID.ROOTSTOCK_TESTNET:
      return "rootstock.svg"
    case ChainID.LIGHTLINK_PHOENIX_MAINNET:
    case ChainID.LIGHTLINK_PEGASUS_TESTNET:
      return "lightlink.svg"
    case ChainID.ETHERLINK_MAINNET:
    case ChainID.ETHERLINK_TESTNET:
      return "etherlink.svg"
    case ChainID.SHARDEUM_SPHINX_1_X:
      return "shardeum.svg"
    case ChainID.VELAS_MAINNET:
      return "velas.svg"
    case ChainID.MODE_MAINNET:
    case ChainID.MODE_SEPOLIA:
      return "mode.svg"
    case ChainID.MORPH_TESTNET:
      return "morph.svg"
    case ChainID.BLAST_MAINNET:
    case ChainID.BLAST_SEPOLIA:
      return "blast.svg"
    case ChainID.SYNDICATE_FRAME_MAINNET:
      return "syndicate.svg"
    case ChainID.DOS_MAINNET:
    case ChainID.DOS_TESTNET:
      return "dos.svg"
    case ChainID.DEGEN_MAINNET:
      return "degen.svg"
    case ChainID.TAIKO_MAINNET:
    case ChainID.TAIKO_HEKLA_TESTNET:
    case ChainID.TAIKO_KATLA_TESTNET:
      return "taiko.svg"
    case ChainID.SHIMMER_MAINNET:
    case ChainID.SHIMMER_TESTNET:
      return "shimmer.svg"
    case ChainID.FRAXSCAN_MAINNET:
    case ChainID.FRAXSCAN_TESTNET:
      return "frax.svg"
    case ChainID.XRP_SIDECHAIN:
      return "xrp.svg"
    case ChainID.CORE_MAINNET:
      return "core.svg"
    case ChainID.BITLAYER_MAINNET:
    case ChainID.BITLAYER_TESTNET:
      return "bitlayer.png"
    case ChainID.ETHEREUM_CLASSIC_MAINNET:
    case ChainID.ETHEREUM_CLASSIC_TESTNET:
      return "etc.svg"
    case ChainID.STABILITY_MAINNET:
    case ChainID.STABILITY_TESTNET:
      return "free.svg"
    case ChainID.KROMA_MAINNET:
    case ChainID.KROMA_SEPOLIA:
      return "kroma.svg"
    case ChainID.COTI_DEVNET:
    case ChainID.COTI_TESTNET:
      return "coti.svg"
    case ChainID.LISK_MAINNET:
    case ChainID.LISK_SEPOLIA:
      return "lisk.svg"
    case ChainID.REDSTONE_MAINNET:
    case ChainID.REDSTONE_GARNET_TESTNET:
      return "redstone.svg"
    case ChainID.OPEN_CAMPUS_CODEX:
      return "opencampus.svg"
    case ChainID.UNICHAIN_SEPOLIA:
      return "unichain.svg"
    case ChainID.MOVEMENT_IMOLA:
      return "movement.svg"
    case ChainID.XAI_GAMES_MAINNET:
    case ChainID.XAI_ARB_TESTNET:
      return "xai.svg"
    case ChainID.SONEIUM_TESTNET:
      return "soneium.svg"
    case ChainID.BLACKFORT_MAINNET:
    case ChainID.BLACKFORT_TESTNET:
      return "bxn.svg"
    case ChainID.APECHAIN_MAINNET:
    case ChainID.APECHAIN_CURTIS_TESTNET:
      return "ape.svg"
    default:
      return ""
  }
}