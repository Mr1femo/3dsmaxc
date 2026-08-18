import { getContent } from "@/lib/i18n";

export function TrustBar() {
  const t = getContent();

  return (
    <section className="border-y border-line bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm font-bold text-muted">{t.trustBar.label}</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {t.trustBar.items.map((item) => (
            <span
              key={item}
              className="text-lg font-extrabold tracking-wide text-slate-400 sm:text-2xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
