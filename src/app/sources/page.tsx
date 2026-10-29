import { SOURCES } from "../../lib/sources";

export const metadata = { title: "Sources | Strategy Teardowns" };

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8">
      <h1 className="text-3xl font-semibold tracking-tight">Sources</h1>
      <p className="mt-2 text-sm text-zinc-400">Every number in the memo traces to one of these. Primary means the company&apos;s own document. Secondary means a press report of it.</p>
      <ul className="mt-6 space-y-3">
        {SOURCES.map((s) => (
          <li key={s.id} className="rounded-xl border border-white/10 p-4">
            <div className="text-xs text-teal-300">{s.id} · {s.kind}</div>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-zinc-200 underline decoration-white/20 hover:decoration-teal-300">{s.label}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
