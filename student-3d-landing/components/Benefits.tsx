import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/i18n";

function Path({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconPaths = [
  "M4 19V7l8-3 8 3v12l-8 3z",
  "M5 17h14M7 13h10M9 9h6",
  "M8 5h8v14H8zM12 5v14",
  "M12 4v7m0 0l4 8M12 11L8 19",
  "M4 16l4-8 4 5 3-4 5 7",
  "M5 19h14M7 15V8h10v7",
];

export function Benefits() {
  const t = getContent();

  return (
    <section id="why-3d" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t.benefits.eyebrow}
          title={t.benefits.title}
          intro={t.benefits.intro}
          align="center"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((item, index) => (
            <article key={item.id} className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
                <Path d={iconPaths[index] ?? iconPaths[0]} />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
