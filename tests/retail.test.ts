import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateStore, requiredMarginPct, rampAt } from "../src/lib/retail";
import { DEFAULTS, VMART, VMM } from "../src/lib/retailAnchors";

test("instant ramp payback matches investment divided by mature EBITDA", () => {
  const o = evaluateStore({ ...DEFAULTS, rampMonths: 0 });
  const months = Math.ceil((o.simplePaybackYears ?? 0) * 12);
  assert.ok(o.rampPaybackMonths !== null && Math.abs(o.rampPaybackMonths - months) <= 1);
});

test("a slower ramp never shortens payback", () => {
  const fast = evaluateStore({ ...DEFAULTS, rampMonths: 6 }).rampPaybackMonths ?? 999;
  const slow = evaluateStore({ ...DEFAULTS, rampMonths: 36 }).rampPaybackMonths ?? 999;
  assert.ok(slow >= fast);
});

test("zero margin never pays back", () => {
  const o = evaluateStore({ ...DEFAULTS, ebitdaMarginPct: 0 });
  assert.equal(o.simplePaybackYears, null);
  assert.equal(o.rampPaybackMonths, null);
});

test("required margin reproduces a three year payback", () => {
  const base = evaluateStore(DEFAULTS);
  const m = requiredMarginPct(base.investmentCrore, base.matureRevenueCrore, 3);
  const o = evaluateStore({ ...DEFAULTS, ebitdaMarginPct: m });
  assert.ok(Math.abs((o.simplePaybackYears ?? 0) - 3) < 1e-9);
});

test("ramp is linear and capped at one", () => {
  assert.equal(rampAt(0, 24, 50), 0.5);
  assert.equal(rampAt(12, 24, 50), 0.75);
  assert.equal(rampAt(30, 24, 50), 1);
});

test("derived anchors cross-check against reported figures", () => {
  assert.equal(VMART.avgStoreSqft, 8629);
  assert.ok(Math.abs(VMART.spsfCrossCheck - VMART.spsfPerMonth) / VMART.spsfPerMonth < 0.1);
  assert.equal(VMM.revenuePerSqftPerYear, 9596);
  assert.equal(VMART.inventoryPerStoreCrore, 1.51);
});
