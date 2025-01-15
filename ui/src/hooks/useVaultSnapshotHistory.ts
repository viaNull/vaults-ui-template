import { GET_API_ROUTE } from "@/constants/api";
import { SerializedVaultSnapshot } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type VaultSnapshotEssentials = Pick<
  SerializedVaultSnapshot,
  | "ts"
  | "slot"
  | "oraclePrice"
  | "totalAccountBaseValue"
  | "totalAccountQuoteValue"
  | "netDeposits"
  | "netQuoteDeposits"
  | "totalShares"
>;

const DEFAULT_SNAPSHOT: VaultSnapshotEssentials[] = [];

export const useVaultSnapshotHistory = (vaultPubkey?: string) => {
  const {
    data: vaultSnapshots = DEFAULT_SNAPSHOT,
    isLoading: isVaultSnapshotsLoading,
  } = useQuery<VaultSnapshotEssentials[]>({
    queryKey: ["vault-snapshots", vaultPubkey],
    queryFn: () => {
      return fetch(
        `${GET_API_ROUTE("vault-snapshots")}?vault=${vaultPubkey}`,
      ).then((res) => res.json());
    },
    enabled: !!vaultPubkey,
    placeholderData: DEFAULT_SNAPSHOT,
  });

  return {
    vaultSnapshots,
    isVaultSnapshotsLoading,
  };
};
