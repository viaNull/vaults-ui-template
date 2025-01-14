CREATE TABLE "vault_depositor_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"ts" numeric(40, 0) NOT NULL,
	"tx_sig" varchar(128) NOT NULL,
	"slot" integer NOT NULL,
	"vault" varchar(44) NOT NULL,
	"depositorAuthority" varchar(44) NOT NULL,
	"action" varchar(32) DEFAULT '' NOT NULL,
	"amount" numeric(40, 0) NOT NULL,
	"spotMarketIndex" integer NOT NULL,
	"vaultSharesBefore" numeric(40, 0) NOT NULL,
	"vaultSharesAfter" numeric(40, 0) NOT NULL,
	"vaultEquityBefore" numeric(40, 0) NOT NULL,
	"userVaultSharesBefore" numeric(40, 0) NOT NULL,
	"totalVaultSharesBefore" numeric(40, 0) NOT NULL,
	"userVaultSharesAfter" numeric(40, 0) NOT NULL,
	"totalVaultSharesAfter" numeric(40, 0) NOT NULL,
	"profitShare" numeric(40, 0) NOT NULL,
	"managementFee" numeric(40, 0) NOT NULL,
	"managementFeeShares" numeric(40, 0) NOT NULL,
	"assetPrice" numeric(40, 0) NOT NULL,
	"notionalValue" numeric(40, 0) NOT NULL,
	CONSTRAINT "vault_depositor_records_tx_sig_amount_vault_depositorAuthority_unique" UNIQUE("tx_sig","amount","vault","depositorAuthority")
);
--> statement-breakpoint
CREATE TABLE "vault_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"ts" numeric(40, 0) NOT NULL,
	"slot" integer NOT NULL,
	"oraclePrice" numeric(40, 0) NOT NULL,
	"totalAccountQuoteValue" numeric(40, 0) NOT NULL,
	"totalAccountBaseValue" numeric(40, 0) NOT NULL,
	"totalAccountBaseValueEwma" numeric(40, 0),
	"vault" varchar(44) NOT NULL,
	"userShares" numeric(40, 0) NOT NULL,
	"totalShares" numeric(40, 0) NOT NULL,
	"netDeposits" numeric(40, 0) NOT NULL,
	"netQuoteDeposits" numeric(40, 0),
	"totalDeposits" numeric(40, 0) NOT NULL,
	"totalWithdraws" numeric(40, 0) NOT NULL,
	"totalWithdrawRequested" numeric(40, 0) NOT NULL,
	"managerNetDeposits" numeric(40, 0) NOT NULL,
	"managerTotalDeposits" numeric(40, 0) NOT NULL,
	"managerTotalWithdraws" numeric(40, 0) NOT NULL,
	"managerTotalProfitShare" numeric(40, 0) NOT NULL,
	"managerTotalFee" numeric(40, 0) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "vault" ON "vault_depositor_records" USING btree ("vault");--> statement-breakpoint
CREATE INDEX "vaultDepositor" ON "vault_depositor_records" USING btree ("vault","depositorAuthority");--> statement-breakpoint
CREATE INDEX "vaultIdx" ON "vault_snapshots" USING btree ("vault");--> statement-breakpoint
CREATE INDEX "slotSortIdx" ON "vault_snapshots" USING btree ("slot");