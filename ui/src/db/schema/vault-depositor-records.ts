import { InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { createBNField, createPubkeyField } from "./utils";

/**
 * Records of deposits and withdrawals from vault depositors.
 * These are used to calculate the apy and returns of the vault.
 * Can also be used to derive the vault depositor's history.
 */
export const vault_depositor_records = pgTable(
  "vault_depositor_records",
  {
    id: serial("id").primaryKey(),
    ts: createBNField("ts").notNull(),
    txSig: varchar("tx_sig", { length: 128 }).notNull(),
    slot: integer("slot").notNull(),

    vault: createPubkeyField("vault").notNull(),
    depositorAuthority: createPubkeyField("depositorAuthority").notNull(),
    action: varchar("action", { length: 32 }).notNull().default(""),
    amount: createBNField("amount").notNull(),
    spotMarketIndex: integer("spotMarketIndex").notNull(),
    vaultSharesBefore: createBNField("vaultSharesBefore").notNull(),
    vaultSharesAfter: createBNField("vaultSharesAfter").notNull(),
    vaultEquityBefore: createBNField("vaultEquityBefore").notNull(),
    userVaultSharesBefore: createBNField("userVaultSharesBefore").notNull(),
    totalVaultSharesBefore: createBNField("totalVaultSharesBefore").notNull(),
    userVaultSharesAfter: createBNField("userVaultSharesAfter").notNull(),
    totalVaultSharesAfter: createBNField("totalVaultSharesAfter").notNull(),
    profitShare: createBNField("profitShare").notNull(),
    managementFee: createBNField("managementFee").notNull(),
    managementFeeShares: createBNField("managementFeeShares").notNull(),

    assetPrice: createBNField("assetPrice").notNull(), // oracle price obtained from Pyth Historical Price API
    notionalValue: createBNField("notionalValue").notNull(),
  },
  (t) => {
    return [
      unique().on(t.txSig, t.amount, t.vault, t.depositorAuthority),
      index("vault").on(t.vault),
      index("vaultDepositor").on(t.vault, t.depositorAuthority),
    ];
  },
);

export type SerializedVaultDepositorRecord = InferSelectModel<
  typeof vault_depositor_records
>;
