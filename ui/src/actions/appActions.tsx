import { AppStoreState } from "@/stores/app/useAppStore";
import { CommonDriftStore } from "@drift-labs/react";
import { StoreApi } from "zustand";

const createAppActions = (
  getCommon: StoreApi<CommonDriftStore>["getState"],
  _setCommon: (x: (s: CommonDriftStore) => void) => void,
  get: StoreApi<AppStoreState>["getState"],
  set: (x: (s: AppStoreState) => void) => void,
) => {
  return {};
};

export default createAppActions;
