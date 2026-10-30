"use client";

import { track } from "../lib/track";
import { useState } from "react";
import { ANCHORS } from "../lib/anchors";
import { curve, evaluate, impliedFixedCostPerDay } from "../lib/model";
import StoreLoader from "./StoreLoader";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function Slider(props: { label: string; value: number; min: number; max: number; step: number; unit?: string; onChange: (v: number) => void; hint?: string }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-zinc-300">{props.label}</span>
        <span className="font-mono text-lime-300">
          {props.step < 1 ? props.value.toFixed(1) : inr(props.value)}
          {props.unit ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        onPointerUp={() => track("slider_changed", { label: props.label })}
        onKeyUp={() => track("slider_changed", { label: props.label })}
        className="mt-1 w-full accent-lime-400"
      />
      {props.hint ? <div className="text-xs text-zinc-500">{props.hint}</div> : null}
    </label>
  );
}

function Chart({ points, reported, breakEven }: { points: { orders: number; profit: number }[]; reported: number; breakEven: number | null }) {
  const W = 560;
  const H = 220;
  const pad = 36;
  const xs = points.map((p) => p.orders);
  const ys = points.map((p) => p.profit);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(0, ...ys);
  const yMax = Math.max(0, ...ys);
  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (W - pad * 2);
  const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin || 1)) * (H - pad * 2);
  const d = points.map((p, k) => `${k ? "L" : "M"}${sx(p.orders).toFixed(1)},${sy(p.profit).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Store profit per day against orders per day">
      <line x1={pad} x2={W - pad} y1={sy(0)} y2={sy(0)} stroke="#475569" strokeDasharray="4 4" />
      <path d={d} fill="none" stroke="#2dd4bf" strokeWidth={2.5} />
      <line x1={sx(reported)} x2={sx(reported)} y1={pad / 2} y2={H - pad} stroke="#fbbf24" strokeWidth={1.5} />
      <text x={sx(reported) + 4} y={pad / 2 + 8} fontSize={11} fill="#fbbf24">reported</text>
      {breakEven !== null && breakEven >= xMin && breakEven <= xMax ? (
        <>
          <line x1={sx(breakEven)} x2={sx(breakEven)} y1={pad / 2} y2={H - pad} stroke="#f87171" strokeWidth={1.5} strokeDasharray="3 3" />
          <text x={sx(breakEven) + 4} y={H - pad - 6} fontSize={11} fill="#f87171">break-even</text>
        </>
      ) : null}
      <text x={pad} y={H - 10} fontSize={11} fill="#94a3b8">{inr(xMin)} orders/day</text>
      <text x={W - pad} y={H - 10} fontSize={11} fill="#94a3b8" textAnchor="end">{inr(xMax)}</text>
      <text x={pad} y={14} fontSize={11} fill="#94a3b8">profit per day, Rs</text>
    </svg>
  );
}

export default function Calculator() {
  const [key, setKey] = useState(ANCHORS[0].key);
  const anchor = ANCHORS.find((a) => a.key === key) ?? ANCHORS[0];
  const [orders, setOrders] = useState(anchor.ordersPerDay);
  const [aov, setAov] = useState(anchor.aov);
  const [v, setV] = useState(9);
  const [capex, setCapex] = useState(anchor.capexCrore);
  const [fixedOverride, setFixedOverride] = useState<number | null>(null);

  const implied = impliedFixedCostPerDay(anchor, v);
  const fixed = fixedOverride ?? implied;

  const inputs = { ordersPerDay: orders, aov, variableMarginPct: v, fixedCostPerDay: fixed, capexCrore: capex };
  const out = evaluate(inputs);
  const pts = curve(inputs, 0, Math.max(3000, anchor.ordersPerDay * 2), 40);

  function pick(k: string) {
    const a = ANCHORS.find((x) => x.key === k) ?? ANCHORS[0];
    setKey(a.key);
    setOrders(a.ordersPerDay);
    setAov(a.aov);
    setCapex(a.capexCrore);
    setFixedOverride(null);
  }

  const good = out.profitPerDay >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap gap-2">
          {ANCHORS.map((a) => (
            <button
              key={a.key}
              onClick={() => pick(a.key)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${a.key === key ? "border-lime-400 bg-lime-400/10 text-lime-200" : "border-white/10 text-zinc-400 hover:text-zinc-100"}`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <Slider label="Orders per store per day" value={orders} min={200} max={3500} step={10} onChange={setOrders} hint={`Reported or derived starting point: ${inr(anchor.ordersPerDay)}`} />
        <Slider label="Average order value" value={aov} min={300} max={1000} step={5} unit=" Rs" onChange={setAov} hint={anchor.aovBasis} />
        <Slider label="Variable margin before store fixed costs" value={v} min={2} max={20} step={0.5} unit="%" onChange={setV} hint="ASSUMPTION. Neither company discloses this. It sets how much fixed cost the reported margin implies." />
        <Slider
          label="Store fixed cost per day"
          value={Math.round(fixed)}
          min={0}
          max={250000}
          step={1000}
          unit=" Rs"
          onChange={setFixedOverride}
          hint={fixedOverride === null ? "Calibrated: the value that reproduces the reported margin at reported orders." : "Overridden by you."}
        />
        {fixedOverride !== null ? (
          <button onClick={() => setFixedOverride(null)} className="text-xs text-lime-300 underline">
            Reset fixed cost to the calibrated value
          </button>
        ) : null}
        <Slider label="Capex per store" value={capex} min={0.5} max={5} step={0.1} unit=" crore" onChange={setCapex} hint={anchor.capexNote} />
        <p className="text-xs text-zinc-500">{anchor.marginBasis}</p>
      </div>

      <div className="space-y-4">
        <div className="h-56 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
          <StoreLoader profit={out.profitPerDay} orders={orders} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Profit per day" value={`${out.profitPerDay < 0 ? "-" : ""}Rs ${inr(Math.abs(out.profitPerDay))}`} good={good} />
          <Stat label="Per month" value={`${out.profitPerMonthLakh < 0 ? "-" : ""}Rs ${Math.abs(out.profitPerMonthLakh).toFixed(1)} lakh`} good={good} />
          <Stat label="Margin" value={`${out.marginPct.toFixed(1)}%`} good={good} />
          <Stat label="Break-even orders" value={out.breakEvenOrders === null ? "none" : inr(out.breakEvenOrders)} good={out.breakEvenOrders !== null && orders >= out.breakEvenOrders} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-sm text-zinc-300">
            Capex payback:{" "}
            <span className="font-mono text-lime-300">{out.paybackMonths === null ? "never at these inputs" : `${out.paybackMonths.toFixed(1)} months`}</span>
          </div>
          <Chart points={pts} reported={anchor.ordersPerDay} breakEven={out.breakEvenOrders} />
        </div>
        <p className="text-xs text-zinc-500">
          Illustrative model, not a forecast and not investment advice. Reported anchors are cited below. Variable margin, fixed cost and Instamart capex are assumptions or implied values, not company disclosures.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</div>
      <div className={`mt-1 font-mono text-base ${good ? "text-lime-300" : "text-red-300"}`}>{value}</div>
    </div>
  );
}
