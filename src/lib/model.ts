export type Inputs = {
  ordersPerDay: number;
  aov: number;
  variableMarginPct: number;
  fixedCostPerDay: number;
  capexCrore: number;
};

export type Outputs = {
  contributionPerOrder: number;
  profitPerDay: number;
  profitPerMonthLakh: number;
  marginPct: number;
  breakEvenOrders: number | null;
  paybackMonths: number | null;
};

export type Anchor = {
  key: string;
  name: string;
  aov: number;
  ordersPerDay: number;
  reportedMarginPct: number;
  aovBasis: string;
  marginBasis: string;
  capexCrore: number;
  capexNote: string;
};

export const DAYS_PER_MONTH = 30;

export function impliedFixedCostPerDay(a: { ordersPerDay: number; aov: number; reportedMarginPct: number }, variableMarginPct: number): number {
  return a.ordersPerDay * a.aov * ((variableMarginPct - a.reportedMarginPct) / 100);
}

export function evaluate(i: Inputs): Outputs {
  const contributionPerOrder = (i.aov * i.variableMarginPct) / 100;
  const profitPerDay = i.ordersPerDay * contributionPerOrder - i.fixedCostPerDay;
  const revenuePerDay = i.ordersPerDay * i.aov;
  const marginPct = revenuePerDay > 0 ? (profitPerDay / revenuePerDay) * 100 : 0;
  const breakEvenOrders = contributionPerOrder > 0 ? i.fixedCostPerDay / contributionPerOrder : null;
  const monthly = profitPerDay * DAYS_PER_MONTH;
  const paybackMonths = monthly > 0 ? (i.capexCrore * 1e7) / monthly : null;
  return {
    contributionPerOrder,
    profitPerDay,
    profitPerMonthLakh: monthly / 1e5,
    marginPct,
    breakEvenOrders,
    paybackMonths,
  };
}

export function curve(i: Inputs, from: number, to: number, steps: number): { orders: number; profit: number }[] {
  const out: { orders: number; profit: number }[] = [];
  for (let s = 0; s <= steps; s++) {
    const orders = from + ((to - from) * s) / steps;
    out.push({ orders, profit: evaluate({ ...i, ordersPerDay: orders }).profitPerDay });
  }
  return out;
}
