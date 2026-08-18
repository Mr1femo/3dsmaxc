"use client";

import { siteConfig } from "@/config/landingPage";
import { getContent } from "@/lib/i18n";

type CouponSuccessProps = {
  duplicate?: boolean;
};

export function CouponSuccess({ duplicate = false }: CouponSuccessProps) {
  const t = getContent();

  return (
    <div className="soft-card rounded-[32px] px-5 py-10 text-center sm:px-10">
      <p className="text-sm font-bold text-brand">
        {duplicate ? t.success.duplicateTitle : t.success.title}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
        {duplicate ? t.success.duplicateSubtitle : t.success.subtitle}
      </h2>
      <a
        href={`#${siteConfig.curriculumId}`}
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 font-bold text-slate-800"
      >
        {t.success.exploreCta}
      </a>
    </div>
  );
}
