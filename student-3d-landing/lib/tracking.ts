export type UtmParams = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export function getUtmParams(search: string = ""): UtmParams {
  const params = new URLSearchParams(search);

  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
  };
}

export function getReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

export function getLandingPage(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

export function persistUtmParams(search: string) {
  if (typeof window === "undefined") return;

  const utm = getUtmParams(search);
  const hasUtm = Object.values(utm).some(Boolean);
  if (!hasUtm) return;

  window.sessionStorage.setItem("utm", JSON.stringify(utm));
}

export function readStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return getUtmParams();
  }

  const stored = window.sessionStorage.getItem("utm");
  if (!stored) {
    return getUtmParams(window.location.search);
  }

  try {
    return JSON.parse(stored) as UtmParams;
  } catch {
    return getUtmParams(window.location.search);
  }
}

export { UTM_KEYS };
