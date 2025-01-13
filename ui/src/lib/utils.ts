import { UiVaultConfig, VAULTS } from "@/constants/vaults";
import { PublicKey } from "@solana/web3.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUiVaultConfig = (
  vaultPubKey: PublicKey | string,
): UiVaultConfig | undefined => {
  const vault = VAULTS.find(
    (vault) => vault.pubkeyString === vaultPubKey.toString(),
  );
  return vault;
};
