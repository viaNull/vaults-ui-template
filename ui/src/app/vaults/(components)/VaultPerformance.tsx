import { VaultStats } from "./VaultStats";
import { VaultPerformanceBreakdown } from "./VaultPerformanceBreakdown";
import Link from "next/link";
import { UiVaultConfig } from "@/constants/vaults";
import { NotionalGrowthStrategyAlert } from "./NotionalGrowthStrategyAlert";
import { ArrowRight } from "lucide-react";

export const VaultPerformance = (props: { uiVaultConfig: UiVaultConfig }) => {
  return (
    <div className="flex flex-col w-full gap-6 pb-4">
      {props.uiVaultConfig.isNotionalGrowthStrategy && (
        <NotionalGrowthStrategyAlert />
      )}

      <VaultStats
        vaultPubkey={props.uiVaultConfig.vaultPubkeyString}
        depositAssetMarketIndex={props.uiVaultConfig.market.marketIndex}
      />
      <VaultPerformanceBreakdown
        vaultPubkey={props.uiVaultConfig.vaultPubkeyString}
        depositAssetMarketIndex={props.uiVaultConfig.market.marketIndex}
      />

      <Link
        className="flex items-center justify-between w-full p-4 border rounded cursor-pointer border-container-border bg-container-bg group text-text-default"
        href={`https://app.drift.trade?authority=${props.uiVaultConfig.vaultPubkeyString}`}
      >
        <span className="group-hover:opacity-80">View Vault</span>
        <ArrowRight className="transition-transform -translate-x-2 group-hover:translate-x-0" />
      </Link>
    </div>
  );
};
