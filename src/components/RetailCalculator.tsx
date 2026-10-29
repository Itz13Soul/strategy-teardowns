"use client";

import { useState } from "react";
import { DEFAULTS } from "../lib/retailAnchors";
import { evaluateStore, requiredMarginPct } from "../lib/retail";
import { Slider } from "./Calculator";

const cr = (n: number) => `${n < 0 ? "-" : ""}Rs ${Math.abs(n).toFixed(2)} cr`;

function CashChart({ pts, payback }: { pts: { month: number; cash: number }[]; payback: number | null }) {
  const W = 560;
  const H = 220;
  const pad = 36;
  const ys = pts.map((p) => p.cash);
  const yMin = Math.min(...ys, 0);
  const yMax = Math.max(...ys, 0);
  const sx = (m: number) => pad + (m / 120) * (W - pad * 2);
  const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin || 1)) * (H - pad * 2);
  const d = pts.map((p, k) => `${k ? "L" : "M"}${sx(p.month).toFixed(1)},${sy(p.cash).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Cumulative store cash over ten years">
      <line x1={pad} x2={W - pad} y1={sy(0)} y2={sy(0)} stroke="#475569" strokeDasharray="4 4" />
      <path d={d} fill="none" stroke="#2dd4bf" strokeWidth={2.5} />
      {payback !== null ? (
        <>
          <line x1={sx(payback)} x2={sx(payback)} y1={pad / 2} y2={H - pad} stroke="#fbbf24" strokeWidth={1.5} />
          <text x={sx(payback) + 4} y={pad / 2 + 8} fontSize={11} fill="#fbbf24">payback, month {payback}</text>
        </>
      ) : null}
      <text x={pad} y={H - 10} fontSize={11} fill="#94a3b8">month 0</text>
      <text x={W - pad} y={H - 10} fontSize={11} fill="#94a3b8" textAnchor="end">month 120</text>
      <text x={pad} y={14} fontSize={11} fill="#94a3b8">cumulative cash, Rs crore</text>
    </svg>
  );
}

export default function RetailCalculator() {
  const [s, setS] = useState(DEFAULTS);
  const set = (k: keyof typeof DEFAULTS) => (v: number) => setS((p) => ({ ...p, [k]: v }));
  const o = evaluateStore(s);
  const need3 = requiredMarginPct(o.investmentCrore, o.matureRevenueCrore, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <Slider label="Store size" value={s.sqft} min={3000} max={20000} step={100} unit=" sq ft" onChange={set("sqft")} hint="V-Mart average, derived: 5.1 million sq ft over 591 stores (S6)." />
        <Slider label="Sales per sq ft per month, mature" value={s.spsfPerMonth} min={300} max={1200} step={5} unit=" Rs" onChange={set("spsfPerMonth")} hint="V-Mart Q1 FY27 reported SPSF (S6)." />
        <Slider label="Store EBITDA margin, mature" value={s.ebitdaMarginPct} min={2} max={25} step={0.5} unit="%" onChange={set("ebitdaMarginPct")} hint="Starts at V-Mart's company-wide 7.6% before Ind AS 116 (S6). That includes central costs, so a store-level margin is likely higher. Not disclosed." />
        <Slider label="Fit-out capex and deposits" value={s.capexCrore} min={0.2} max={3} step={0.05} unit=" crore" onChange={set("capexCrore")} hint="ASSUMPTION. Neither company discloses capex per store." />
        <Slider label="Net inventory funded by the store" value={s.inventoryCrore} min={0} max={3} step={0.05} unit=" crore" onChange={set("inventoryCrore")} hint="Starts at gross inventory per store, derived from S6. Supplier credit would lower it, and it is not disclosed." />
        <Slider label="Months to reach maturity" value={s.rampMonths} min={0} max={48} step={1} onChange={set("rampMonths")} hint="ASSUMPTION. Not disclosed." />
        <Slider label="Sales in month 1, % of mature" value={s.rampStartPct} min={20} max={100} step={5} unit="%" onChange={set("rampStartPct")} hint="ASSUMPTION. Not disclosed." />
        <button onClick={() => setS(DEFAULTS)} className="text-xs text-lime-300 underline">Reset to reported starting points</button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Mature sales" value={`${cr(o.matureRevenueCrore)}/yr`} good />
          <Stat label="Mature EBITDA" value={`${cr(o.matureEbitdaCrore)}/yr`} good={o.matureEbitdaCrore > 0} />
          <Stat label="Investment" value={cr(o.investmentCrore)} good />
          <Stat label="Margin for 3-yr payback" value={`${need3.toFixed(1)}%`} good={s.ebitdaMarginPct >= need3} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-sm text-zinc-300">
            Payback at maturity run-rate: <span className="font-mono text-lime-300">{o.simplePaybackYears === null ? "never" : `${o.simplePaybackYears.toFixed(1)} years`}</span>
            {" · "}with ramp-up: <span className="font-mono text-lime-300">{o.rampPaybackMonths === null ? "beyond 10 years" : `${o.rampPaybackMonths} months`}</span>
          </div>
          <CashChart pts={o.cumulative} payback={o.rampPaybackMonths} />
        </div>
        <p className="text-xs text-zinc-500">
          Illustrative, not a forecast and not investment advice. The ramp-up view applies the mature margin from the first month and ignores early losses, so it is a best case. Capex, ramp-up and the store-level margin are assumptions.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</div>
      <div className={`mt-1 font-mono text-sm ${good ? "text-lime-300" : "text-red-300"}`}>{value}</div>
    </div>
  );
}
