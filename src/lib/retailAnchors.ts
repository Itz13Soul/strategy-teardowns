const stores = 591;
const areaMnSqft = 5.1;
const q1RevenueMn = 10888;
const inventoryMn = 8939;

export const VMART = {
  stores,
  areaMnSqft,
  avgStoreSqft: Math.round((areaMnSqft * 1e6) / stores),
  spsfPerMonth: 767,
  tierSpsf: [
    { tier: "Tier 1", spsf: 763 },
    { tier: "Tier 2", spsf: 774 },
    { tier: "Tier 3", spsf: 763 },
    { tier: "Tier 4", spsf: 768 },
  ],
  tier34Stores: 376,
  ebitdaPreIndAsPct: 7.6,
  ebitdaPostIndAsPct: 14.8,
  inventoryDays: 86,
  q1RevenueCrore: q1RevenueMn / 10,
  inventoryCrore: inventoryMn / 10,
  inventoryPerStoreCrore: Math.round((inventoryMn / 10 / stores) * 100) / 100,
  spsfCrossCheck: Math.round((q1RevenueMn * 1e6) / (areaMnSqft * 1e6 * 3)),
};

export const VMM = {
  stores: 795,
  areaMnSqft: 13.45,
  fy26RevenueMn: 129063,
  revenuePerSqftPerYear: Math.round((129063 * 1e6) / (13.45 * 1e6)),
  adjEbitdaPct: 10.2,
  avgStoreSqft: Math.round((13.45 * 1e6) / 795),
};

export const DEFAULTS = {
  sqft: VMART.avgStoreSqft,
  spsfPerMonth: VMART.spsfPerMonth,
  ebitdaMarginPct: VMART.ebitdaPreIndAsPct,
  capexCrore: 1.0,
  inventoryCrore: VMART.inventoryPerStoreCrore,
  rampMonths: 24,
  rampStartPct: 50,
};
