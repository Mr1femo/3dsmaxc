export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "course_section_view"
  | "form_start"
  | "form_submit"
  | "lead_created"
  | "coupon_revealed"
  | "coupon_copied"
  | "future_course_selected";

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

type AnalyticsProvider = {
  name: string;
  track: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
};

const providers: AnalyticsProvider[] = [];

export function registerAnalyticsProvider(provider: AnalyticsProvider) {
  providers.push(provider);
}

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, payload ?? {});
  }

  for (const provider of providers) {
    try {
      provider.track(event, payload);
    } catch (error) {
      console.warn(`[analytics] ${provider.name} failed`, error);
    }
  }
}
