import useAppStore from "@/stores/app/useAppStore";
import {
  useCommonDriftStore,
  useImmediateInterval,
  useOraclePriceStore,
} from "@drift-labs/react";
import { OraclePriceInfo } from "@drift-labs/react";
import { PublicKey, QUOTE_PRECISION, ZERO } from "@drift-labs/sdk";
import { Vault, VaultClient } from "@drift-labs/vaults-sdk";
import { MarketId } from "@drift/common";
import { Connection } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getUiVaultConfig } from "@/lib/utils";

import { SPOT_MARKETS_LOOKUP } from "@/constants/environment";

const UPDATE_FREQUENCY_MS = 10_000;

const vaultDataDecoder = (
  buffer: Buffer,
  vaultProgram: VaultClient["program"],
): Vault => {
  const account = vaultProgram.account.vault.coder.accounts.decode(
    "vault",
    buffer,
  );
  return account;
};

const getMultipleVaultAccountData = async (
  vaultClient: VaultClient,
  connection: Connection,
  vaultPubKeys: PublicKey[],
): Promise<Record<string, Vault>> => {
  // create pairs of vault public keys and its user stats account
  const pubKeysToFetch = vaultPubKeys
    .map((vaultPubKey) => [vaultPubKey])
    .flat();

  const response = await connection.getMultipleAccountsInfo(pubKeysToFetch);

  const vaultAccountLookup: Record<string, Vault> = {};

  // process each pair of data
  for (let i = 0; i < vaultPubKeys.length; i++) {
    if (!response[i]?.data) continue;

    const vaultAccountBuffer = response[i]!.data;

    const vaultAccountData = vaultDataDecoder(
      vaultAccountBuffer,
      vaultClient.program,
    );

    const vaultPubKeyString = vaultPubKeys[i].toString();
    vaultAccountLookup[vaultPubKeyString] = vaultAccountData;
  }

  return vaultAccountLookup;
};

const getVaultStats = async (
  vaultPubKey: string | PublicKey,
  vaultClient: VaultClient,
  vaultAccountData: Vault,
  getMarketPriceData: (market: MarketId) => OraclePriceInfo,
) => {
  const vaultConfig = getUiVaultConfig(vaultPubKey);
  const isUsdcMarket = vaultConfig?.market.marketIndex === 0;

  const baseAssetPriceBN = isUsdcMarket
    ? QUOTE_PRECISION
    : getMarketPriceData(
        MarketId.createSpotMarket(vaultConfig?.market.marketIndex ?? 0),
      )?.rawPriceData.price ?? ZERO;

  const totalAccountQuoteValueBN = await vaultClient.calculateVaultEquity({
    vault: vaultAccountData,
  });
  const totalAccountBaseValueBN = baseAssetPriceBN.eqn(0)
    ? ZERO
    : totalAccountQuoteValueBN
        .mul(
          SPOT_MARKETS_LOOKUP[vaultConfig?.market.marketIndex ?? 0].precision,
        )
        .div(baseAssetPriceBN);

  const netDepositBase = vaultAccountData?.netDeposits;

  const allTimeTotalPnlQuoteValue =
    await vaultClient.calculateVaultAllTimeNotionalPnl({
      vault: vaultAccountData,
    });
  const allTimeTotalPnlBaseValue = totalAccountBaseValueBN.sub(netDepositBase);

  return {
    totalAccountQuoteValue: totalAccountQuoteValueBN,
    totalAccountBaseValue: totalAccountBaseValueBN,
    allTimeTotalPnlQuoteValue,
    allTimeTotalPnlBaseValue,
    isLoaded: baseAssetPriceBN.gt(ZERO),
    vaultPubKey: vaultPubKey,
  };
};

export const useSyncVaultsStats = () => {
  const vaultClient = useAppStore((s) => s.vaultClient);
  const connection = useCommonDriftStore((s) => s.connection);
  const setAppStore = useAppStore((s) => s.set);
  const getMarketPriceData = useOraclePriceStore((s) => s.getMarketPriceData);
  const symbolMapAsTick = useOraclePriceStore((s) => s.symbolMap);
  const vaultPubkeys = useAppStore((s) => Object.keys(s.vaults));
  const [vaultAccountLookup, setVaultAccountLookup] = useState<
    Record<string, Vault>
  >({});

  const memoizedVaultsPubkeys = useMemo(
    () => vaultPubkeys,
    [vaultPubkeys.join(",")],
  );

  const fetchAndSyncLiveVaults = useCallback(async () => {
    if (!vaultClient || !connection) return;

    const vaultAccountLookup = await getMultipleVaultAccountData(
      vaultClient,
      connection,
      memoizedVaultsPubkeys.map((vaultPubKey) => new PublicKey(vaultPubKey)),
    );

    setVaultAccountLookup(vaultAccountLookup);
  }, [vaultClient, connection, memoizedVaultsPubkeys]);

  useEffect(() => {
    if (!vaultClient) return;

    const vaultsStatsPromises = Object.keys(vaultAccountLookup).map(
      async (vaultPubKey) => {
        const vaultAccountData = vaultAccountLookup[vaultPubKey];
        return getVaultStats(
          vaultPubKey,
          vaultClient,
          vaultAccountData,
          getMarketPriceData,
        );
      },
    );

    Promise.all(vaultsStatsPromises).then((vaultsStats) => {
      setAppStore((s) => {
        vaultsStats.forEach((vaultStats) => {
          s.vaults[vaultStats.vaultPubKey.toString()] = {
            ...s.vaults[vaultStats.vaultPubKey.toString()],
            vaultStats,
          };
        });
      });
    });
  }, [vaultAccountLookup, vaultClient, symbolMapAsTick]);

  useImmediateInterval(fetchAndSyncLiveVaults, UPDATE_FREQUENCY_MS, true);
};
