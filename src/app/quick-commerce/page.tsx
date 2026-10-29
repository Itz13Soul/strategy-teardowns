import type { Metadata } from "next";
import Calculator from "../../components/Calculator";
import { ANCHORS, BLINKIT_DERIVATION } from "../../lib/anchors";
import { evaluate, impliedFixedCostPerDay } from "../../lib/model";

export const metadata: Metadata = {
  title: "Quick-commerce dark-store unit economics | Strategy Teardowns",
  description: "What a dark store must do per day to break even, built from Swiggy and Eternal Q2 FY27 disclosures, with a live model.",
};

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function Ref({ ids }: { ids: string }) {
  return <sup className="ml-0.5 text-[10px] text-lime-300">[{ids}]</sup>;
}

export default function Page() {
  const im = ANCHORS[0];
  const bl = ANCHORS[1];
  const imPerOrder = (im.reportedMarginPct / 100) * im.aov;
  const blPerOrder = (bl.reportedMarginPct / 100) * bl.aov;
  const gap = blPerOrder - imPerOrder;
  const throughputGap = (bl.ordersPerDay / im.ordersPerDay - 1) * 100;
  const be = (v: number) => (im.ordersPerDay * (v - im.reportedMarginPct)) / v;
  const lo = be(12);
  const hi = be(6);
  const blOut = evaluate({
    ordersPerDay: bl.ordersPerDay,
    aov: bl.aov,
    variableMarginPct: 9,
    fixedCostPerDay: impliedFixedCostPerDay(bl, 9),
    capexCrore: bl.capexCrore,
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16">
      <article className="rise max-w-3xl pt-8">
        <div className="text-xs uppercase tracking-wide text-lime-300">Teardown 1 · Q2 FY27 data · 29 October 2026</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Quick-commerce dark stores: the store is nearly there, the company is not
        </h1>

        <h2 className="mt-8 text-lg font-semibold">The answer</h2>
        <p className="mt-2 text-zinc-300">
          Swiggy reports that Instamart&apos;s contribution margin is -1.0% of GOV, while its adjusted EBITDA is -9.7% of GOV<Ref ids="S1" />. Eternal reports Blinkit&apos;s contribution margin at 5.3% and adjusted EBITDA at 0.9%<Ref ids="S4" />. At the store level, Instamart is close to break-even. Under the model below, it needs roughly {Math.round(((lo / im.ordersPerDay) - 1) * 100)}% to {Math.round(((hi / im.ordersPerDay) - 1) * 100)}% more orders per store per day, about {inr(lo)} to {inr(hi)} against {inr(im.ordersPerDay)} today. On the reported figures, most of its loss sits between contribution margin and EBITDA, not at the contribution line.
        </p>

        <h2 className="mt-8 text-lg font-semibold">What the filings say</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr><th className="py-2 pr-3">Q2 FY27</th><th className="pr-3">Instamart</th><th>Blinkit</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-zinc-300">
              <tr><td className="py-2 pr-3">Dark stores at quarter end</td><td className="pr-3">1,240<Ref ids="S1" /></td><td>2,751, up 308<Ref ids="S2,S3" /></td></tr>
              <tr><td className="py-2 pr-3">Average order value</td><td className="pr-3">Rs 708 gross<Ref ids="S1" /></td><td>Rs 525 net<Ref ids="S2" /></td></tr>
              <tr><td className="py-2 pr-3">Orders per store per day</td><td className="pr-3">1,192<Ref ids="S1" /></td><td>~{inr(bl.ordersPerDay)} derived</td></tr>
              <tr><td className="py-2 pr-3">Contribution margin</td><td className="pr-3">-1.0% of GOV<Ref ids="S1" /></td><td>5.3%<Ref ids="S4" /></td></tr>
              <tr><td className="py-2 pr-3">Adjusted EBITDA</td><td className="pr-3">Rs -895 crore, -9.7% of GOV<Ref ids="S1" /></td><td>Rs 184 crore, 0.9% of NOV<Ref ids="S3" /></td></tr>
              <tr><td className="py-2 pr-3">Capex per store</td><td className="pr-3">Not disclosed</td><td>Rs 2.5 crore, up from Rs 1 crore<Ref ids="S5" /></td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Blinkit orders per store per day is my calculation: {BLINKIT_DERIVATION.ordersMillion} million orders<Ref ids="S2" /> over {BLINKIT_DERIVATION.days} days and an average of {inr(BLINKIT_DERIVATION.avgStores)} stores (opening {inr(BLINKIT_DERIVATION.storesOpen)}, closing {inr(BLINKIT_DERIVATION.storesExit)}). Cross-check: NOV of Rs 20,940 crore<Ref ids="S3" /> divided by those orders gives Rs {BLINKIT_DERIVATION.crossCheckAov}, matching the reported Rs 525.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Three things the numbers show</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-zinc-300">
          <li>
            <b>Throughput is the gap.</b> Blinkit&apos;s derived {inr(bl.ordersPerDay)} orders per store per day is about {Math.round(throughputGap)}% above Instamart&apos;s reported {inr(im.ordersPerDay)}. On a Rs per order view, Instamart&apos;s contribution is about Rs {Math.abs(imPerOrder).toFixed(1)} negative and Blinkit&apos;s about Rs {blPerOrder.toFixed(1)} positive, a spread near Rs {Math.round(gap)} per order. The bases differ (gross versus net order value), so treat the spread as indicative.
          </li>
          <li>
            <b>Break-even hinges on a fixed cost nobody discloses.</b> If a store&apos;s costs are mostly fixed (rent, staff, utilities), each extra order adds nearly its whole variable margin. The break-even line in the model moves only from {inr(lo)} to {inr(hi)} orders per day when the unknown variable margin is varied from 12% down to 6%.
          </li>
          <li>
            <b>Payback is a throughput story too.</b> At Blinkit&apos;s reported 5.3% margin and Rs 2.5 crore capex<Ref ids="S5" />, the model gives a payback near {blOut.paybackMonths?.toFixed(0)} months for an average store. New stores in small cities ramp slower, so the average hides a wide spread.
          </li>
        </ol>

        <h2 className="mt-8 text-lg font-semibold">What I would watch</h2>
        <p className="mt-2 text-zinc-300">
          Instamart orders per store per day, which rose 9.5% in the quarter while 69 stores were added<Ref ids="S1" />. If that keeps rising faster than the store count, the store-level gap closes without any change in pricing. The EBITDA gap needs a different explanation, and the letter figures I extracted do not break it down.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Limits of this analysis</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-400">
          <li>One quarter, company-wide averages. Mature and new stores behave differently.</li>
          <li>The two companies define contribution margin and order value differently. I read Swiggy&apos;s letter directly (S1). I could not open Eternal&apos;s own letter, so Blinkit figures come from press reports (S2 to S5) and the basis of the 5.3% is not stated there.</li>
          <li>Variable margin, store fixed cost and Instamart capex are assumptions or implied values, labelled as such in the model. The model treats the reported contribution margin as store-level profit after store costs, which the companies may define more narrowly.</li>
          <li>Analysis for discussion. It is not investment advice, and the model is illustrative, not a forecast.</li>
        </ul>
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Change the assumptions</h2>
        <p className="mb-5 mt-1 max-w-2xl text-sm text-zinc-400">
          Pick a company, then move the sliders. Fixed cost is calibrated so that the model reproduces the reported margin at the reported order count, whatever variable margin you assume.
        </p>
        <Calculator />
      </section>
    </main>
  );
}
