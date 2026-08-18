import type { Metadata } from "next";
import { Geist_Mono, Tajawal } from "next/font/google";
import { PageTracker } from "@/components/PageTracker";
import { siteConfig } from "@/config/landingPage";
import { getContent, getDirection } from "@/lib/i18n";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const content = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: content.seo.title,
  description: content.seo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: content.seo.ogTitle,
    description: content.seo.ogDescription,
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.ogTitle,
    description: content.seo.ogDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      dir={getDirection()}
      className={`${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background pb-24 text-foreground md:pb-0">
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
