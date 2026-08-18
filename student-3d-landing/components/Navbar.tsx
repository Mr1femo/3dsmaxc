"use client";

import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function Navbar() {
  const t = getContent();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-wide">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm text-white">
            3D
          </span>
          <span className="text-slate-900">{t.brand.shortName}</span>
        </a>

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-muted md:flex"
          aria-label="التنقل الرئيسي"
        >
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-brand">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`#${siteConfig.formId}`}
          onClick={() => trackEvent("hero_cta_click", { source: "navbar" })}
          className="btn-primary rounded-xl px-4 py-2.5 text-sm font-bold transition"
        >
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
