import { OffChainVaultStats, PeriodApys } from "@/types/vaults";

export const SOLANA_EXPLORER_URL = "https://explorer.solana.com";

export const TOKEN_ICON_S3_OBJECT_URL = `https://drift-public.s3.eu-central-1.amazonaws.com/assets/icons/markets`;

export const DEFAULT_PERIOD_APY: keyof PeriodApys = "90d";

export const DEFAULT_OFF_CHAIN_STATS: OffChainVaultStats = {
  apys: {
    "7d": 0,
    "30d": 0,
    "90d": 0,
  },
  maxDrawdownPct: 0,
  numOfVaultSnapshots: 0,
  hasLoadedOffChainStats: false,
};
