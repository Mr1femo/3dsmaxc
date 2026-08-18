import type { LeadFormValues } from "@/lib/validation";
import type { UtmParams } from "@/lib/tracking";

export type LeadPayload = LeadFormValues &
  UtmParams & {
    referrer: string;
    landingPage: string;
  };

export type LeadSuccessResponse = {
  success: true;
  duplicate?: boolean;
};

export type LeadErrorResponse = {
  success: false;
  error: string;
};

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as LeadResponse;
  if (!response.ok && !("error" in data)) {
    return { success: false, error: "حدث خطأ. حاول مرة أخرى." };
  }
  return data;
}
