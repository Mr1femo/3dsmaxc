"use client";

import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function DiscountCTA() {
  const t = getContent();

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-[32px] bg-brand-soft px-6 py-10 sm:flex-row sm:justify-between sm:px-10">
        <div className="max-w-2xl text-center sm:text-right">
          <p className="text-xl font-extrabold text-slate-700 sm:text-2xl">{t.hero.offerHook}</p>
          <p className="mt-2 text-4xl font-black leading-[1.15] text-brand sm:text-6xl">
            {t.hero.offerPunchline}
          </p>
          <h2 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {t.discountCta.title}
          </h2>
          <p className="mt-3 leading-8 text-muted">{t.discountCta.text}</p>
        </div>
        <a
          href={`#${siteConfig.formId}`}
          onClick={() => trackEvent("hero_cta_click", { source: "discount_band" })}
          className="btn-primary inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl px-8 text-base font-bold transition"
        >
          {t.discountCta.cta}
        </a>
      </div>
    </section>
  );
}
