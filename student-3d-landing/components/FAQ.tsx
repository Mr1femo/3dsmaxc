"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/lib/i18n";

export function FAQ() {
  const t = getContent();
  const [openId, setOpenId] = useState<string | null>(t.faq.items[0]?.id ?? null);

  return (
    <section id="faq" className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} align="center" />

        <div className="soft-card mt-10 divide-y divide-line overflow-hidden rounded-3xl">
          {t.faq.items.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="bg-white">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-${item.id}`}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-right text-base font-bold text-slate-900 sm:px-6"
                >
                  <span>{item.question}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-${item.id}`}
                  hidden={!open}
                  className="px-5 pb-5 leading-8 text-muted sm:px-6"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
