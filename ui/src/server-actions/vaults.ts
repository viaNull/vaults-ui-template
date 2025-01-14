"use server";

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
