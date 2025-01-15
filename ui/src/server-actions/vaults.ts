"use server";

import { kv } from "@vercel/kv";
import { ApyReturnsLookup } from "@/types/vaults";
import { REDIS_KEYS } from "@/constants/redis";

export const createVaultSnapshot = async (vaultPubkey: string) => {
  const res = await fetch(
    `${process.env.VERCEL_URL}/api/cron/vaults/vault-snapshots?vault=${vaultPubkey}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    },
  );

  const data = await res.json();
  return data;
};

export const getVaultsApyReturns = async (): Promise<ApyReturnsLookup> => {
  const apyReturnsData = await kv.hgetall(REDIS_KEYS.periodApys);

  return apyReturnsData as ApyReturnsLookup;
};
