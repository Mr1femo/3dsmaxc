import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/i18n";

export function Curriculum() {
  const t = getContent();

  return (
    <section id="curriculum" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow={t.curriculum.eyebrow}
            title={t.curriculum.title}
            intro={t.curriculum.intro}
          />
          <ul className="mt-8 space-y-4">
            {t.curriculum.steps.slice(0, 4).map((step) => (
              <li key={step.id} className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">{t.curriculum.note}</p>
        </div>

        <div className="soft-card overflow-hidden rounded-[28px] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">{t.curriculum.eyebrow}</p>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
              3ds Max · V-Ray · Corona
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.curriculum.steps.map((step, index) => (
              <article
                key={step.id}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <p className="text-xs font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-extrabold text-slate-900">{step.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
