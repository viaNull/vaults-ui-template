import { SpotMarketConfig } from "@drift-labs/sdk";
import { SPOT_MARKETS_LOOKUP } from "./environment";

export type UiVaultConfig = {
  name: string;
  pubkeyString: string;
  managerPubkey: string;
  userPubKey: string;
  description: string;
  market: SpotMarketConfig;
};

const SUPERCHARGER_VAULT: UiVaultConfig = {
  name: "Supercharger",
  pubkeyString: "GXyE3Snk3pPYX4Nz9QRVBrnBfbJRTAQYxuy5DRdnebAn",
  managerPubkey: "GT3RSBy5nS2ACpT3LCkycHWm9CVJCSuqErAgf4sE33Qu",
  userPubKey: "BRksHqLiq2gvQw1XxsZq6DXZjD3GB5a9J63tUBgd6QS9",
  description:
    "Multiply your yields with delta-neutral market making strategies focused on SOL",
  market: SPOT_MARKETS_LOOKUP[0],
};

const TURBOCHARGER_VAULT: UiVaultConfig = {
  name: "Turbocharger",
  pubkeyString: "F3no8aqNZRSkxvMEARC4feHJfvvrST2ZrHzr2NBVyJUr",
  managerPubkey: "GT3RSBy5nS2ACpT3LCkycHWm9CVJCSuqErAgf4sE33Qu",
  userPubKey: "2aMcirYcF9W8aTFem6qe8QtvfQ22SLY6KUe6yUQbqfHk",
  description:
    "Multiply your yields with delta-neutral market making & innovative strategies on SOL/BTC/ETH/JUP",
  market: SPOT_MARKETS_LOOKUP[0],
};

export const VAULTS = [SUPERCHARGER_VAULT, TURBOCHARGER_VAULT];
