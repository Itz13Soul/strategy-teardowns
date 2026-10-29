import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate, impliedFixedCostPerDay, curve } from "../src/lib/model";
import { ANCHORS, BLINKIT_DERIVATION } from "../src/lib/anchors";

test("calibrated model reproduces the reported margin at reported throughput", () => {
  for (const a of ANCHORS) {
    for (const v of [6, 9, 12]) {
      const f = impliedFixedCostPerDay(a, v);
      const o = evaluate({ ordersPerDay: a.ordersPerDay, aov: a.aov, variableMarginPct: v, fixedCostPerDay: f, capexCrore: a.capexCrore });
      assert.ok(Math.abs(o.marginPct - a.reportedMarginPct) < 1e-9);
    }
  }
});

test("break-even throughput equals reported throughput scaled by (v - m) / v", () => {
  const a = ANCHORS[0];
  const v = 9;
  const f = impliedFixedCostPerDay(a, v);
  const o = evaluate({ ordersPerDay: a.ordersPerDay, aov: a.aov, variableMarginPct: v, fixedCostPerDay: f, capexCrore: 2.5 });
  const expected = (a.ordersPerDay * (v - a.reportedMarginPct)) / v;
  assert.ok(Math.abs((o.breakEvenOrders ?? 0) - expected) < 1e-6);
});

test("payback is null when the store loses money and finite when it earns", () => {
  const base = { ordersPerDay: 1000, aov: 500, variableMarginPct: 10, fixedCostPerDay: 60000, capexCrore: 2 };
  assert.equal(evaluate(base).paybackMonths, null);
  const earning = evaluate({ ...base, ordersPerDay: 2000 });
  assert.ok(earning.paybackMonths !== null && earning.paybackMonths > 0);
  assert.ok(Math.abs((earning.paybackMonths ?? 0) - (2e7 / (40000 * 30))) < 1e-9);
});

test("no break-even exists when per-order contribution is not positive", () => {
  const o = evaluate({ ordersPerDay: 1000, aov: 500, variableMarginPct: 0, fixedCostPerDay: 1000, capexCrore: 1 });
  assert.equal(o.breakEvenOrders, null);
});

test("curve is monotonic in orders when contribution per order is positive", () => {
  const pts = curve({ ordersPerDay: 0, aov: 600, variableMarginPct: 8, fixedCostPerDay: 50000, capexCrore: 2 }, 0, 3000, 30);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i].profit > pts[i - 1].profit);
});

test("Blinkit derived throughput and NOV cross-check match the sources", () => {
  assert.equal(BLINKIT_DERIVATION.crossCheckAov, 524.9);
  assert.ok(BLINKIT_DERIVATION.result > 1600 && BLINKIT_DERIVATION.result < 1750);
});
