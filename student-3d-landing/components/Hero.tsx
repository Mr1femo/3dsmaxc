"use client";

import { CourseVisual } from "@/components/CourseVisual";
import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function Hero() {
  const t = getContent();

  return (
    <section className="hero-wash relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
            {t.hero.formatBadge}
          </p>
          <p className="mb-3 text-sm font-bold text-brand">{t.hero.courseName}</p>
          <h1 className="text-4xl font-extrabold leading-[1.2] text-slate-900 sm:text-5xl lg:text-[56px]">
            {t.hero.headline}{" "}
            <span className="text-brand">{t.hero.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
            {t.hero.support}
          </p>

          <div className="mt-7 overflow-hidden rounded-3xl border-2 border-brand bg-brand px-5 py-5 text-white sm:px-7 sm:py-6">
            <p className="text-base font-extrabold sm:text-xl">{t.hero.discountLabel}</p>
            <p className="mt-1 text-6xl font-black leading-none tracking-tight sm:text-8xl">
              {t.hero.discountValue}
            </p>
            <p className="mt-3 text-sm font-bold text-violet-100 sm:text-base">
              {t.hero.priceLabel}: {t.hero.priceValue} {t.hero.priceCurrency}
            </p>
            <p className="mt-2 text-sm font-bold text-white">{t.hero.formatNote}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`#${siteConfig.formId}`}
              onClick={() => trackEvent("hero_cta_click", { source: "hero_primary" })}
              className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition"
            >
              {t.hero.primaryCta}
              <span aria-hidden>←</span>
            </a>
            <a
              href={`#${siteConfig.curriculumId}`}
              onClick={() => trackEvent("hero_cta_click", { source: "hero_secondary" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-800 transition hover:border-brand/30 hover:text-brand"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand">
                ▶
              </span>
              {t.hero.secondaryCta}
            </a>
          </div>

          <p className="mt-6 text-sm font-medium text-muted">{t.hero.proof}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="purple-blob absolute inset-x-6 inset-y-4 rounded-full blur-2xl" />
          <CourseVisual
            variant="hero"
            alt={t.hero.courseName}
            className="relative z-10"
          />

          <div className="absolute -right-1 top-8 z-20 hidden w-44 sm:block lg:-right-6">
            <StatCard value={t.hero.stats[0].value} label={t.hero.stats[0].label} />
          </div>
          <div className="absolute -left-1 top-1/2 z-20 hidden w-44 -translate-y-1/2 sm:block lg:-left-8">
            <StatCard value={t.hero.stats[1].value} label={t.hero.stats[1].label} />
          </div>
          <div className="absolute bottom-8 left-8 z-20 hidden w-44 sm:block">
            <StatCard value={t.hero.stats[2].value} label={t.hero.stats[2].label} />
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 sm:hidden">
            {t.hero.stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="soft-card rounded-2xl px-4 py-3">
      <p className="text-2xl font-black text-brand">{value}</p>
      <p className="mt-0.5 text-xs font-bold text-slate-700">{label}</p>
    </div>
  );
}
