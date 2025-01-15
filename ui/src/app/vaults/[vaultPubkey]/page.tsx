"use client";

import { useVault } from "@/hooks/useVault";
import { getUiVaultConfig } from "@/lib/utils";
import { use, useState } from "react";
import { VaultPerformance } from "../(components)/VaultPerformance";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UserPerformance } from "../(components)/UserPerformance";
import { VaultDepositWithdrawForm } from "../(components)/VaultDepositWithdrawForm";

type ContentTab = "VaultPerformance" | "UserPerformance" | "Overview";

const CONTENT_TAB_OPTIONS: { value: ContentTab; label: string }[] = [
  {
    value: "VaultPerformance",
    label: "Vault Performance",
  },
  {
    value: "UserPerformance",
    label: "Your Performance",
  },
];

export default function VaultPage(props: {
  params: Promise<{
    vaultPubkey: string;
  }>;
}) {
  const params = use(props.params);
  const vaultPubkey = params.vaultPubkey;
  const uiVaultConfig = getUiVaultConfig(vaultPubkey);

  const [activeTab, setActiveTab] = useState<ContentTab>(
    CONTENT_TAB_OPTIONS[0].value,
  );

  const {
    vaultAccountData,
    vaultDepositorAccountData,
    isVaultDepositorLoaded,
    syncVaultStats,
  } = useVault(vaultPubkey);

  if (!uiVaultConfig || !vaultAccountData) {
    return <div>Vault not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{uiVaultConfig?.name}</h1>
      <p>Vault Pubkey: {vaultPubkey}</p>
      <p>Description: {uiVaultConfig?.description}</p>

      <div className="flex mt-4">
        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ContentTab)}
        >
          {CONTENT_TAB_OPTIONS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex w-full gap-6 mt-4">
        {activeTab === "VaultPerformance" && (
          <VaultPerformance uiVaultConfig={uiVaultConfig} />
        )}
        {activeTab === "UserPerformance" && vaultDepositorAccountData && (
          <UserPerformance
            depositAssetConfig={uiVaultConfig.market}
            vaultPubkey={vaultPubkey}
            vaultAccountData={vaultAccountData}
            vaultDepositorAccountData={vaultDepositorAccountData}
            isVaultDepositorLoaded={isVaultDepositorLoaded}
          />
        )}
        <VaultDepositWithdrawForm
          uiVaultConfig={uiVaultConfig}
          vaultDepositorAccountData={vaultDepositorAccountData}
          isVaultDepositorLoaded={isVaultDepositorLoaded}
          vaultAccountData={vaultAccountData}
          syncVaultStats={syncVaultStats}
        />
      </div>
    </div>
  );
}
