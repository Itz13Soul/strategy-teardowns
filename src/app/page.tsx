import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16">
      <section className="rise pt-10">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Strategy memos you can argue with.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Each teardown is a one to two page memo plus a live model. Every number is cited to a filing or a credible report. Anything assumed is labelled, and you can move it.
        </p>
      </section>
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/quick-commerce" className="rounded-2xl border border-teal-400/30 bg-teal-400/5 p-6 transition-colors hover:border-teal-300">
          <div className="text-xs uppercase tracking-wide text-teal-300">Teardown 1, live</div>
          <h2 className="mt-2 text-xl font-semibold">Quick-commerce dark-store unit economics</h2>
          <p className="mt-2 text-sm text-zinc-400">What a store must do per day to break even, built from Swiggy and Eternal Q2 FY27 disclosures.</p>
        </Link>
        <div className="rounded-2xl border border-white/10 p-6 opacity-70">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Teardown 2, in progress</div>
          <h2 className="mt-2 text-xl font-semibold">Tier-2 retail store expansion payback</h2>
          <p className="mt-2 text-sm text-zinc-400">Not published yet. It will use public filings and annual reports only.</p>
        </div>
      </section>
    </main>
  );
}
