"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { getContent } from "@/lib/i18n";

export function StickyCTA() {
  const t = getContent();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const form = document.getElementById(siteConfig.formId);
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 backdrop-blur-xl md:hidden">
      <a
        href={`#${siteConfig.formId}`}
        onClick={() => trackEvent("hero_cta_click", { source: "sticky_mobile" })}
        className="btn-primary flex min-h-12 items-center justify-between rounded-xl px-5 font-bold"
      >
        <span>{t.hero.offerPunchline}</span>
        <span className="text-sm">{t.hero.offerHook}</span>
      </a>
    </div>
  );
}
