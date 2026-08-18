import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/i18n";

export function StudentBenefits() {
  const t = getContent();

  return (
    <section id="student-benefits" className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t.studentBenefits.eyebrow}
          title={t.studentBenefits.title}
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.studentBenefits.items.map((item) => (
            <article key={item.id} className="soft-card rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path d="M12 4l2.2 4.8L20 10l-4 3.6.9 5.4L12 16.8 7.1 19l.9-5.4L4 10l5.8-1.2z" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-8 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
