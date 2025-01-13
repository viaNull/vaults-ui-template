import { produce } from "immer";
import { create } from "zustand";
import {
  VaultAccount,
  VaultClient,
  WrappedEvents,
  VaultDepositorAccount,
  VaultDepositor,
  Vault,
} from "@drift-labs/vaults-sdk";
import { DriftClient, User, UserAccount, BN } from "@drift-labs/sdk";

export interface VaultStats {
  totalAccountQuoteValue: BN;
  totalAccountBaseValue: BN;
  allTimeTotalPnlQuoteValue: BN;
  allTimeTotalPnlBaseValue: BN;
  isLoaded: boolean;
}

export type UIVault = {
  vaultDriftClient: DriftClient;
  vaultDriftUser: User; // used to get vault's drift account data (e.g. vault balance)
  vaultDriftUserAccount: UserAccount | undefined; // we store the actual account data so we know when it updates -> object reference will update when account data updates
  vaultAccount: VaultAccount;
  vaultAccountData: Vault; // we store the actual account data so we know when it updates
  vaultDepositorAccount?: VaultDepositorAccount;
  vaultDepositorAccountData?: VaultDepositor; // we store the actual account data so we know when it updates
  isVaultDepositorDataLoaded: boolean; // used to determine if user is a vault depositor; if vault depositor data is loaded and vaultDepositorAccount is not undefined, then user is a vault depositor
  eventRecords: { records: WrappedEvents; isLoaded: boolean };
  vaultStats: VaultStats;
};

export interface AppStoreState {
  set: (x: (s: AppStoreState) => void) => void;
  get: () => AppStoreState;
  vaultClient: VaultClient | null;
  vaults: {
    [vaultPubKey: string]: UIVault;
  };
}

const DEFAULT_APP_STORE_STATE = {};

const useAppStore = create<AppStoreState>((set, get) => {
  const setProducerFn = (fn: (s: AppStoreState) => void) => set(produce(fn));
  return {
    ...DEFAULT_APP_STORE_STATE,
    set: setProducerFn,
    get: () => get(),
    vaultClient: null,
    vaults: {},
  };
});

export default useAppStore;
