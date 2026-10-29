import Link from "next/link";
import { SOURCES } from "../lib/sources";

export default function Home() {
  const primary = SOURCES.filter((s) => s.kind === "primary").length;
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-12 md:pt-20">
        <h1 className="font-display hero-in max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
          Strategy memos you can argue with.
        </h1>
        <p className="hero-in mt-5 max-w-xl text-lg text-zinc-300" style={{ animationDelay: "100ms" }}>
          A short memo and a live model for each teardown, built only from public disclosures. Change an assumption and watch the conclusion move.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          <li>
            <Link href="/quick-commerce" className="group grid gap-4 py-8 transition hover:bg-white/[0.03] md:grid-cols-[1.3fr_1fr] md:px-2">
              <div>
                <h2 className="font-display text-2xl font-semibold">Quick-commerce dark-store economics</h2>
                <p className="mt-2 text-zinc-300">What a store must do per day to break even, from Swiggy and Eternal Q2 FY27 disclosures.</p>
                <span className="mt-4 inline-block text-lime-200 underline-offset-4 group-hover:underline">Open the memo and model</span>
              </div>
              <div className="self-center">
                <p className="font-display text-4xl font-semibold">-1.0% vs -9.7%</p>
                <p className="mt-1 text-sm text-zinc-400">Instamart contribution margin against adjusted EBITDA, as a share of gross order value</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tier-2-retail" className="group grid gap-4 py-8 transition hover:bg-white/[0.03] md:grid-cols-[1.3fr_1fr] md:px-2">
              <div>
                <h2 className="font-display text-2xl font-semibold">Tier-2 retail store payback</h2>
                <p className="mt-2 text-zinc-300">What a value-retail store in a smaller city must earn to pay back, from V-Mart and Vishal Mega Mart filings.</p>
                <span className="mt-4 inline-block text-lime-200 underline-offset-4 group-hover:underline">Open the memo and model</span>
              </div>
              <div className="self-center">
                <p className="font-display text-4xl font-semibold">8.4 to 12.6%</p>
                <p className="mt-1 text-sm text-zinc-400">Store margin needed for a three-year payback, depending on the assumed fit-out cost</p>
              </div>
            </Link>
          </li>
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-zinc-400">
          Every number is cited to one of {SOURCES.length} sources, {primary} of them primary, and every assumption is labelled.{" "}
          <Link href="/sources" className="text-lime-200 underline-offset-4 hover:underline">Sources</Link>. Analysis for discussion, not investment advice.
        </p>
      </section>
    </main>
  );
}
