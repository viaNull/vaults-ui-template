import { twMerge } from "tailwind-merge";
import { VaultStatsSkeleton } from "./VaultStatsSkeleton";
import { UIMarket } from "@drift/common";
import useAppStore from "@/stores/app/useAppStore";
import { DEFAULT_PERIOD_APY } from "@/constants/misc";

export const VaultStats = (props: {
  vaultPubkey: string;
  depositAssetMarketIndex: number;
}) => {
  const vaultStats = useAppStore((s) => s.vaultsStats[props.vaultPubkey]);
  const isLoadingVaultStats = !vaultStats?.hasLoadedOnChainStats;
  const depositAssetConfig = UIMarket.createSpotMarket(
    props.depositAssetMarketIndex,
  ).market;

  const apy = vaultStats?.apys[DEFAULT_PERIOD_APY] ?? 0;

  const stats = [
    {
      label: "APY",
      value: `${apy?.toFixed(2)}%`,
      valueClassName: twMerge(
        apy < 0 ? "text-negative-red" : "text-positive-green",
      ),
      loading: isLoadingVaultStats,
    },
    {
      label: "TVL",
      value: `${vaultStats?.tvlBase.toMillified()}`,
      marketSymbol: depositAssetConfig.symbol,
      loading: isLoadingVaultStats,
    },
    {
      label: "Capacity",
      value: vaultStats?.isUncappedCapacity
        ? "Uncapped"
        : `${vaultStats?.capacityPct.toFixed(2)}%`,
      loading: isLoadingVaultStats,
    },
  ];

  return <VaultStatsSkeleton stats={stats} />;
};
