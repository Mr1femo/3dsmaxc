import { ar } from "@/config/content/ar";
import type { LandingContent, Locale } from "@/config/content/types";
import { siteConfig } from "@/config/landingPage";

const dictionaries: Partial<Record<Locale, LandingContent>> = {
  ar,
};

export const defaultLocale: Locale = siteConfig.locale;

export function getContent(locale: Locale = defaultLocale): LandingContent {
  return dictionaries[locale] ?? ar;
}

export function getDirection(locale: Locale = defaultLocale) {
  return locale === "ar" ? "rtl" : "ltr";
}
