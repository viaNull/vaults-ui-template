"use client";

import { VaultCard } from "@/components/vaults/VaultCard";
import { useSyncAllVaultsStats } from "@/hooks/useSyncVaultsStats";
import useAppStore from "@/stores/app/useAppStore";

export default function VaultsPage() {
  useSyncAllVaultsStats();

  const vaultStats = useAppStore((s) => s.vaultsStats);
  console.log("🚀 ~ VaultsPage ~ vaultStats:", vaultStats);

  const loadedVaults = Object.keys(vaultStats);

  if (loadedVaults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Vaults</h1>

      <div className="grid grid-cols-2 gap-4">
        {loadedVaults.map((vaultPubKey) => (
          <VaultCard
            key={vaultPubKey}
            vaultStat={vaultStats[vaultPubKey]}
            vaultPubkey={vaultPubKey}
          />
        ))}
      </div>
    </div>
  );
}
