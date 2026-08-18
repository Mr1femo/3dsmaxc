"use client";

import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function FinalCTA() {
  const t = getContent();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-[32px] bg-brand px-6 py-12 text-center text-white sm:flex-row sm:justify-between sm:px-12 sm:text-right">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            {t.finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-violet-100 sm:text-lg">
            {t.finalCta.text}
          </p>
        </div>
        <div>
          <a
            href={`#${siteConfig.formId}`}
            onClick={() => trackEvent("hero_cta_click", { source: "final_cta" })}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-brand transition hover:bg-violet-50"
          >
            {t.finalCta.cta}
          </a>
          <p className="mt-3 text-sm text-violet-100">يظهر الكوبون مباشرة بعد التسجيل</p>
        </div>
      </div>
    </section>
  );
}
