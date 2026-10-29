import type { Anchor } from "./model";

const BLINKIT_ORDERS_M = 398.9;
const BLINKIT_STORES_EXIT = 2751;
const BLINKIT_NET_ADDS = 308;
const QUARTER_DAYS = 92;

const blinkitAvgStores = (BLINKIT_STORES_EXIT + (BLINKIT_STORES_EXIT - BLINKIT_NET_ADDS)) / 2;

export const BLINKIT_ORDERS_PER_STORE_DAY = Math.round((BLINKIT_ORDERS_M * 1e6) / QUARTER_DAYS / blinkitAvgStores);

export const BLINKIT_DERIVATION = {
  ordersMillion: BLINKIT_ORDERS_M,
  storesExit: BLINKIT_STORES_EXIT,
  storesOpen: BLINKIT_STORES_EXIT - BLINKIT_NET_ADDS,
  avgStores: blinkitAvgStores,
  days: QUARTER_DAYS,
  result: BLINKIT_ORDERS_PER_STORE_DAY,
  crossCheckAov: Math.round((20940e7 / (BLINKIT_ORDERS_M * 1e6)) * 10) / 10,
};

export const ANCHORS: Anchor[] = [
  {
    key: "instamart",
    name: "Instamart, Q2 FY27",
    aov: 708,
    ordersPerDay: 1192,
    reportedMarginPct: -1.0,
    aovBasis: "Gross order value per order (reported, S1 p.7)",
    marginBasis: "Contribution margin as % of GOV (reported, S1 p.4)",
    capexCrore: 2.5,
    capexNote: "Instamart capex per store is not disclosed. 2.5 is Blinkit's figure (S5) used as a placeholder.",
  },
  {
    key: "blinkit",
    name: "Blinkit, Q2 FY27",
    aov: 525,
    ordersPerDay: BLINKIT_ORDERS_PER_STORE_DAY,
    reportedMarginPct: 5.3,
    aovBasis: "Net order value per order (reported, S2). Not comparable with Instamart's gross AOV.",
    marginBasis: "Contribution margin 5.3% (reported, S4). The sources do not say whether the base is NOV or GOV; treated as NOV.",
    capexCrore: 2.5,
    capexNote: "Capex per store of Rs 2.5 crore, up from Rs 1 crore (S5).",
  },
];
