import type { Metadata } from "next";
import RetailCalculator from "../../components/RetailCalculator";
import { VMART, VMM, DEFAULTS } from "../../lib/retailAnchors";
import { evaluateStore, requiredMarginPct } from "../../lib/retail";

export const metadata: Metadata = {
  title: "Tier-2 retail store expansion payback | Strategy Teardowns",
  description: "What a value-retail store in a smaller city must earn to pay back, built from V-Mart and Vishal Mega Mart filings, with a live model.",
};

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function Ref({ ids }: { ids: string }) {
  return <sup className="ml-0.5 text-[10px] text-lime-300">[{ids}]</sup>;
}

export default function Page() {
  const base = evaluateStore(DEFAULTS);
  const rev = base.matureRevenueCrore;
  const ceiling = base.matureEbitdaCrore * 3;
  const left = ceiling - VMART.inventoryPerStoreCrore;
  const rows = [0.5, 1.0, 1.5].map((c) => ({ c, m: requiredMarginPct(c + VMART.inventoryPerStoreCrore, rev, 3) }));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16">
      <article className="rise max-w-3xl pt-8">
        <div className="text-xs uppercase tracking-wide text-lime-300">Teardown 2 · Q1 and Q2 FY27 data · 29 October 2026</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Tier-2 store expansion: sales per sq ft is not the lever, inventory is the weight
        </h1>

        <h2 className="mt-8 text-lg font-semibold">The answer</h2>
        <p className="mt-2 text-zinc-300">
          Neither V-Mart nor Vishal Mega Mart discloses capex per store or store payback, so a measured payback cannot be published. What the filings do allow is a test of what you would have to believe. V-Mart earns the same sales per sq ft in Tier 2, 3 and 4 as in Tier 1 (Rs 763 to 774 a month)<Ref ids="S6" />, so smaller cities do not need lower productivity to work. But a V-Mart store holds roughly Rs {VMART.inventoryPerStoreCrore} crore of inventory (derived, gross), against about Rs {base.matureEbitdaCrore.toFixed(2)} crore of mature EBITDA at the company-wide margin. A three-year payback then leaves only about Rs {left.toFixed(2)} crore for fit-out, so the store-level margin must be well above the company average.
        </p>

        <h2 className="mt-8 text-lg font-semibold">What the filings say</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr><th className="py-2 pr-3"> </th><th className="pr-3">V-Mart</th><th>Vishal Mega Mart</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-zinc-300">
              <tr><td className="py-2 pr-3">Stores</td><td className="pr-3">591 at Q1 FY27<Ref ids="S6" />, 613 at Q2<Ref ids="S7" /></td><td>795 at March 2026<Ref ids="S8" />, 844 at Q2 FY27<Ref ids="S9" /></td></tr>
              <tr><td className="py-2 pr-3">Smaller-city share</td><td className="pr-3">376 of 591 stores in Tier 3 and 4<Ref ids="S6" /></td><td>Tier split not readable in my extraction</td></tr>
              <tr><td className="py-2 pr-3">Retail area</td><td className="pr-3">5.1 million sq ft<Ref ids="S6" /></td><td>13.45 million sq ft<Ref ids="S8" /></td></tr>
              <tr><td className="py-2 pr-3">Average store size</td><td className="pr-3">~{inr(VMART.avgStoreSqft)} sq ft, derived</td><td>~{inr(VMM.avgStoreSqft)} sq ft, derived</td></tr>
              <tr><td className="py-2 pr-3">Sales per sq ft</td><td className="pr-3">Rs {VMART.spsfPerMonth} a month<Ref ids="S6" /></td><td>~Rs {inr(VMM.revenuePerSqftPerYear / 12)} a month, derived (FY26 revenue over year-end area)<Ref ids="S8" /></td></tr>
              <tr><td className="py-2 pr-3">EBITDA margin</td><td className="pr-3">{VMART.ebitdaPreIndAsPct}% pre Ind AS 116<Ref ids="S6" /></td><td>{VMM.adjEbitdaPct}% adjusted, FY26<Ref ids="S8" /></td></tr>
              <tr><td className="py-2 pr-3">Capex per store, payback</td><td className="pr-3">Not disclosed</td><td>Not disclosed</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Derived checks: V-Mart Q1 FY27 revenue of Rs {inr(VMART.q1RevenueCrore)} crore over 5.1 million sq ft for three months is Rs {VMART.spsfCrossCheck} per sq ft a month, within 10% of the reported Rs {VMART.spsfPerMonth}<Ref ids="S6" />. Inventory of Rs {inr(VMART.inventoryCrore)} crore over 591 stores is Rs {VMART.inventoryPerStoreCrore} crore a store; it includes stock outside stores and is before supplier credit.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Three things the numbers show</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-zinc-300">
          <li>
            <b>Productivity does not fall with city size.</b> V-Mart reports Tier 1 at Rs 763, Tier 2 at Rs 774, Tier 3 at Rs 763 and Tier 4 at Rs 768 per sq ft a month, with Tier 4 growing fastest at 15%<Ref ids="S6" />. If smaller cities pay back faster, the reason is lower rent and fit-out cost, which neither company breaks out by tier.
          </li>
          <li>
            <b>Inventory dominates the investment.</b> A mature store of about {inr(VMART.avgStoreSqft)} sq ft sells roughly Rs {rev.toFixed(1)} crore a year at Rs {VMART.spsfPerMonth} per sq ft a month (derived). Stock of Rs {VMART.inventoryPerStoreCrore} crore is about {Math.round((VMART.inventoryPerStoreCrore / rev) * 100)}% of that, broadly in line with the 86 inventory days reported<Ref ids="S6" />. In this model, a Rs 1 crore saving in inventory shortens payback exactly as much as a Rs 1 crore saving in capex.
          </li>
          <li>
            <b>The margin you must believe.</b> For a three-year payback on the model, the store-level EBITDA margin must be:
            <span className="mt-2 block font-mono text-sm text-lime-300">
              {rows.map((r) => `${r.m.toFixed(1)}% if fit-out costs Rs ${r.c.toFixed(1)} crore`).join(" · ")}
            </span>
            <span className="mt-1 block text-sm text-zinc-400">
              Compare {VMART.ebitdaPreIndAsPct}% for V-Mart and {VMM.adjEbitdaPct}% for Vishal Mega Mart company-wide. Those include central costs, so store-level margins are higher, but by how much is not disclosed. The fit-out figures are hypothetical.
            </span>
          </li>
        </ol>

        <h2 className="mt-8 text-lg font-semibold">What I would watch</h2>
        <p className="mt-2 text-zinc-300">
          Whether either company starts disclosing new-store payback or four-wall margin. Until then, the signals are same-store growth, which V-Mart reports at 3% for Q2 FY27 (11% adjusted for the festive calendar shift)<Ref ids="S7" />, and inventory days, which fell from 93 to 86 year on year<Ref ids="S6" />.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Limits of this analysis</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-400">
          <li>V-Mart&apos;s sales-per-sq-ft basis (average or closing area, mature stores or all) is not defined in the deck, and I read tier values from a text extraction that I reconciled against the stated growth rates.</li>
          <li>Vishal Mega Mart figures are derived from year-end area, which understates sales per sq ft for a growing network. Q2 FY27 details come from a press summary (S9).</li>
          <li>Capex, ramp-up and store-level margin are assumptions, labelled in the model. The ramp-up view ignores early losses, so it is a best case.</li>
          <li>Analysis for discussion. It is not investment advice, and the model is illustrative, not a forecast.</li>
        </ul>
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Change the assumptions</h2>
        <p className="mb-5 mt-1 max-w-2xl text-sm text-zinc-400">Starting points are V-Mart&apos;s reported or derived figures. Capex and ramp-up are placeholders you should move.</p>
        <RetailCalculator />
      </section>
    </main>
  );
}
