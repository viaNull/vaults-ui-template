export type PeriodApys = {
  "7d": number;
  "30d": number;
  "90d": number;
};

export type ApyReturnsLookup = Record<
  string,
  {
    apys: PeriodApys;
    maxDrawdownPct: number;
    numOfVaultSnapshots: number;
  }
>;
