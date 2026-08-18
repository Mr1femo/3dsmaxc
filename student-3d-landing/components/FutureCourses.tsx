"use client";

import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function FutureCourses() {
  const t = getContent();

  return (
    <section id="future-courses" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold text-brand">{t.futureCourses.eyebrow}</p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.futureCourses.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">{t.futureCourses.intro}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {t.futureCourses.courses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl border border-line bg-background px-4 py-6 text-center"
            >
              <p className="text-lg font-extrabold text-slate-800">{course.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`#${siteConfig.formId}`}
            onClick={() => trackEvent("hero_cta_click", { source: "future_courses" })}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand/20 bg-brand-soft px-6 font-bold text-brand transition hover:bg-brand hover:text-white"
          >
            {t.futureCourses.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
