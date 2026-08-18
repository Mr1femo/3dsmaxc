import { siteConfig } from "@/config/landingPage";
import { getContent } from "@/lib/i18n";

export function HelpContact() {
  const t = getContent();
  const { instagram, instagramUrl, whatsapp, whatsappUrl } = siteConfig.support;

  return (
    <section id="help" className="px-4 py-12 sm:px-6">
      <div className="soft-card mx-auto max-w-7xl rounded-[32px] px-6 py-10 text-center sm:px-10">
        <h2 className="text-3xl font-extrabold text-slate-900">{t.help.title}</h2>
        <p className="mt-3 text-muted">{t.help.intro}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-6 font-bold text-slate-800 transition hover:border-brand hover:text-brand sm:w-auto"
          >
            {t.help.instagramLabel}: {instagram}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 font-bold sm:w-auto"
            dir="ltr"
          >
            {t.help.whatsappLabel}: {whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
