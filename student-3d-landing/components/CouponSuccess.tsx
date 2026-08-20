"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/landingPage";
import { getContent } from "@/lib/i18n";

type CouponSuccessProps = {
  duplicate?: boolean;
};

export function CouponSuccess({ duplicate = false }: CouponSuccessProps) {
  const t = getContent();
  const [open, setOpen] = useState(true);
  const title = duplicate ? t.success.duplicateTitle : t.success.title;
  const subtitle = duplicate ? t.success.duplicateSubtitle : t.success.subtitle;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="soft-card relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] px-5 py-8 text-center sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-3xl text-brand">
              ✓
            </span>
            <h2 id="success-title" className="mt-5 text-3xl font-extrabold text-slate-900">
              {title}
            </h2>
            <p className="mt-3 text-lg font-bold leading-8 text-brand">{subtitle}</p>

            <ul className="mt-6 space-y-3 text-right text-sm leading-7 text-slate-700">
              <li className="rounded-2xl bg-brand-soft px-4 py-3">{t.success.whatsappWait}</li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">{t.success.groupNote}</li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">
                {t.success.instagramNote}
                <span className="mt-1 block font-extrabold text-brand" dir="ltr">
                  @{siteConfig.support.instagram}
                </span>
              </li>
            </ul>

            <a
              href={siteConfig.support.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 font-bold"
            >
              {t.success.instagramCta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-6 font-bold text-slate-800"
            >
              {t.success.closeCta}
            </button>
          </div>
        </div>
      ) : null}

      <div className="soft-card rounded-[32px] px-5 py-10 text-center sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-2xl text-brand">
          ✓
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-slate-900">{title}</h2>
        <p className="mt-3 text-lg font-bold leading-8 text-brand">{subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-muted">{t.success.whatsappWait}</p>
        <p className="mt-2 text-sm leading-7 text-muted">{t.success.groupNote}</p>
        <p className="mt-4 font-bold text-slate-800">
          {t.success.instagramNote}{" "}
          <a
            href={siteConfig.support.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand"
            dir="ltr"
          >
            @{siteConfig.support.instagram}
          </a>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={siteConfig.support.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex min-h-12 items-center justify-center rounded-xl px-6 font-bold"
          >
            {t.success.instagramCta}
          </a>
          <a
            href={`#${siteConfig.curriculumId}`}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 font-bold text-slate-800"
          >
            {t.success.exploreCta}
          </a>
        </div>
      </div>
    </>
  );
}
