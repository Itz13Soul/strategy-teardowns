export type StoreInputs = {
  sqft: number;
  spsfPerMonth: number;
  ebitdaMarginPct: number;
  capexCrore: number;
  inventoryCrore: number;
  rampMonths: number;
  rampStartPct: number;
};

export type StoreOutputs = {
  matureRevenueCrore: number;
  matureEbitdaCrore: number;
  investmentCrore: number;
  simplePaybackYears: number | null;
  rampPaybackMonths: number | null;
  cumulative: { month: number; cash: number }[];
};

export const HORIZON_MONTHS = 120;

export function rampAt(month: number, rampMonths: number, startPct: number): number {
  if (rampMonths <= 0) return 1;
  const s = startPct / 100;
  if (month >= rampMonths) return 1;
  return s + (1 - s) * (month / rampMonths);
}

export function evaluateStore(i: StoreInputs): StoreOutputs {
  const matureRevenueCrore = (i.sqft * i.spsfPerMonth * 12) / 1e7;
  const matureEbitdaCrore = (matureRevenueCrore * i.ebitdaMarginPct) / 100;
  const investmentCrore = i.capexCrore + i.inventoryCrore;
  const simplePaybackYears = matureEbitdaCrore > 0 ? investmentCrore / matureEbitdaCrore : null;
  const cumulative: { month: number; cash: number }[] = [{ month: 0, cash: -investmentCrore }];
  let cash = -investmentCrore;
  let rampPaybackMonths: number | null = null;
  for (let m = 1; m <= HORIZON_MONTHS; m++) {
    cash += (matureEbitdaCrore / 12) * rampAt(m, i.rampMonths, i.rampStartPct);
    cumulative.push({ month: m, cash });
    if (rampPaybackMonths === null && cash >= 0) rampPaybackMonths = m;
  }
  return { matureRevenueCrore, matureEbitdaCrore, investmentCrore, simplePaybackYears, rampPaybackMonths, cumulative };
}

export function requiredMarginPct(investmentCrore: number, matureRevenueCrore: number, years: number): number {
  return (investmentCrore / (years * matureRevenueCrore)) * 100;
}
