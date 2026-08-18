import { getContent } from "@/lib/i18n";

export function Footer() {
  const t = getContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-7xl text-sm text-muted">
        <p>
          {t.brand.name} · {t.footer.rights} {year}
        </p>
      </div>
    </footer>
  );
}
