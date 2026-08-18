"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { persistUtmParams } from "@/lib/tracking";

export function PageTracker() {
  useEffect(() => {
    persistUtmParams(window.location.search);
    trackEvent("page_view", {
      path: window.location.pathname,
    });
  }, []);

  return null;
}
