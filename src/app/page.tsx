import Link from "next/link";
import { SOURCES } from "../lib/sources";

const PRINCIPLES = [
  { t: "Every number is cited", b: "Each figure points to a filing, a company deck or a credible report, and the source is marked primary or secondary." },
  { t: "Every assumption is labelled", b: "Where a company does not disclose a number, the model says so and shows what it assumed instead of hiding it." },
  { t: "Every model can be moved", b: "Sliders let you change the assumption you disagree with and see what happens to break-even and payback." },
];

export default function Home() {
  const primary = SOURCES.filter((s) => s.kind === "primary").length;
  return (
    <main className="overflow-x-clip">
      <section className="relative">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-[1.2fr_0.8fr] md:pt-20">
          <div>
            <h1 className="font-display hero-in text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ animationDelay: "60ms" }}>
              Strategy memos you can argue with.
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lg text-zinc-300" style={{ animationDelay: "160ms" }}>
              Each teardown is a short memo and a live model built only from public disclosures. Change an assumption and watch the conclusion move.
            </p>
            <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
              <Link href="/quick-commerce" className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-zinc-950 shadow-[0_0_40px_-8px_rgba(190,242,100,0.7)] transition hover:bg-lime-200">
                Open the dark-store model
              </Link>
              <Link href="/tier-2-retail" className="rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5">
                Open the tier-2 retail model
              </Link>
            </div>
          </div>
          <div className="hero-in glass rounded-3xl p-6" style={{ animationDelay: "320ms" }}>
            <p className="text-sm text-zinc-400">Instamart, Q2 FY27, as a share of gross order value</p>
            <div className="mt-5 space-y-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-zinc-300">Contribution margin</span>
                  <span className="font-display text-4xl font-semibold tabular-nums">-1.0%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-lime-300" style={{ width: "10%" }} /></div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-zinc-300">Adjusted EBITDA</span>
                  <span className="font-display text-4xl font-semibold tabular-nums">-9.7%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-red-400" style={{ width: "97%" }} /></div>
              </div>
            </div>
            <p className="mt-5 text-sm text-zinc-300">The store is close to break-even. The gap to the company result sits below the store line.</p>
            <p className="mt-2 text-xs text-zinc-400">Source: Swiggy shareholder letter, listed on the Sources page.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Two teardowns, both live</h2>
        <div className="mt-8 space-y-4">
          <Link href="/quick-commerce" className="glass group grid gap-6 rounded-3xl p-6 transition hover:border-lime-300/40 md:grid-cols-[1.4fr_1fr] md:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold">Quick-commerce dark-store unit economics</h3>
              <p className="mt-3 text-zinc-300">What a store must do per day to break even, built from Swiggy and Eternal Q2 FY27 disclosures.</p>
              <span className="mt-5 inline-block font-medium text-lime-200 underline-offset-4 group-hover:underline">Read the memo and use the model</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-center">
              <div>
                <dd className="font-display text-3xl font-semibold">8 to 17%</dd>
                <dt className="text-sm text-zinc-400">more orders a day for Instamart stores to break even, under an assumed 6 to 12% variable margin</dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-semibold">18 months</dd>
                <dt className="text-sm text-zinc-400">modelled Blinkit payback on Rs 2.5 crore capex</dt>
              </div>
            </dl>
          </Link>
          <Link href="/tier-2-retail" className="glass group grid gap-6 rounded-3xl p-6 transition hover:border-lime-300/40 md:grid-cols-[1.4fr_1fr] md:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold">Tier-2 retail store expansion payback</h3>
              <p className="mt-3 text-zinc-300">What a value-retail store in a smaller city must earn to pay back, from V-Mart and Vishal Mega Mart filings.</p>
              <span className="mt-5 inline-block font-medium text-lime-200 underline-offset-4 group-hover:underline">Read the memo and use the model</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-center">
              <div>
                <dd className="font-display text-3xl font-semibold">Rs 763 to 774</dd>
                <dt className="text-sm text-zinc-400">V-Mart sales per sq ft a month, flat across city tiers 1 to 4</dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-semibold">8.4 to 12.6%</dd>
                <dt className="text-sm text-zinc-400">store margin needed for a three-year payback, depending on fit-out cost</dt>
              </div>
            </dl>
          </Link>
        </div>
        <p className="mt-4 text-sm text-zinc-400">Modelled figures depend on assumptions that are labelled inside each memo. Analysis for discussion, not investment advice.</p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <h2 className="font-display max-w-2xl text-3xl font-semibold sm:text-4xl">How to read them</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.t} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{p.b}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-lime-300/10 via-transparent to-sky-400/10 p-8 sm:p-12">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{SOURCES.length} sources, {primary} of them primary</h2>
          <p className="mt-3 max-w-xl text-zinc-300">Company letters and exchange decks are marked primary. Press reports are marked secondary and used with care.</p>
          <Link href="/sources" className="mt-6 inline-block rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5">See every source</Link>
        </div>
      </section>
    </main>
  );
}
