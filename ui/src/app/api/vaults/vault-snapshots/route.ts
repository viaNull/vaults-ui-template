import { asc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { vault_snapshots } from "@/db/schema";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const vault = searchParams.get("vault");

  if (!vault) {
    return Response.json({
      error: "vault is required in the query params",
    });
  }

  const vaultSnapshots = await db
    .select()
    .from(vault_snapshots)
    .where(eq(vault_snapshots.vault, vault))
    .orderBy(asc(vault_snapshots.slot));

  return Response.json(vaultSnapshots, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
