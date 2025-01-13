import { decodeName, Vault } from "@drift-labs/vaults-sdk";
import { MarketIcon } from "../MarketIcon";
import { SPOT_MARKETS_LOOKUP } from "@/constants/environment";
import { BigNum } from "@drift-labs/sdk";
import { Button } from "../ui/button";
import Link from "next/link";
import { PAGES } from "@/constants/pages";

const VaultInfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-500 max-w-[200px]">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
};

const DEFAULT_LIQUIDATION_DELEGATE = "11111111111111111111111111111111";

// display name, pubkey
export const VaultCard = ({ vault }: { vault: Vault }) => {
  const spotMarketConfig = SPOT_MARKETS_LOOKUP[vault.spotMarketIndex];

  return (
    <div className="flex flex-col gap-1 p-4 border border-gray-200 rounded-md">
      <VaultInfoRow label="Vault Name" value={decodeName(vault.name)} />
      <VaultInfoRow label="Vault Pubkey" value={vault.pubkey.toBase58()} />
      <VaultInfoRow
        label="Main Collateral"
        value={<MarketIcon marketSymbol={spotMarketConfig.symbol} />}
      />
      <VaultInfoRow
        label="Current Total Withdraw Requested"
        value={BigNum.from(
          vault.totalWithdrawRequested,
          spotMarketConfig.precisionExp,
        ).toString()}
      />
      <VaultInfoRow
        label="Liquidation Delegate"
        value={
          vault.liquidationDelegate.toBase58() === DEFAULT_LIQUIDATION_DELEGATE
            ? "-"
            : vault.liquidationDelegate.toBase58()
        }
      />
      <Link href={`${PAGES.vaultManagerHome}/${vault.pubkey.toBase58()}`}>
        <Button className="mt-2">View Vault</Button>
      </Link>
    </div>
  );
};
