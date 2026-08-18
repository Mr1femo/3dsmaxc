"use client";

import { useEffect, useRef } from "react";
import { CourseVisual } from "@/components/CourseVisual";
import { SectionHeading } from "@/components/SectionHeading";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function SoftwareSection() {
  const t = getContent();
  const ref = useRef<HTMLElement>(null);
  const viewed = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewed.current) {
          viewed.current = true;
          trackEvent("course_section_view");
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="software"
      ref={ref}
      className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t.software.eyebrow}
          title={t.software.title}
          intro={t.software.intro}
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.software.cards.map((card) => (
            <article key={card.id} className="soft-card overflow-hidden rounded-3xl">
              <CourseVisual
                variant="card"
                accent="violet"
                alt={card.name}
                src={card.image}
                badge={card.name}
                className="rounded-none"
              />
              <div className="p-6">
                <p className="text-sm font-bold text-brand">{card.tagline}</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">{card.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
