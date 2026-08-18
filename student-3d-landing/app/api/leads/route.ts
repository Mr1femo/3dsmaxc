import { NextRequest, NextResponse } from "next/server";
import { generateCouponCode } from "@/lib/coupon";
import { readableLeadFields } from "@/lib/leadLabels";
import { isRateLimited } from "@/lib/rateLimit";
import { getContent } from "@/lib/i18n";
import {
  hasLeadErrors,
  sanitizeLead,
  validateLead,
  type LeadFormValues,
} from "@/lib/validation";

export const runtime = "nodejs";

type IncomingLead = LeadFormValues & {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
  turnstileToken?: string;
};

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function text(value: unknown) {
  return typeof value === "string" ? value.slice(0, 2000) : "";
}

export async function POST(request: NextRequest) {
  const t = getContent();

  try {
    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { success: false, error: "محاولة كثيرة. حاول بعد قليل." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as IncomingLead;

    // Honeypot: pretend success without saving.
    if (text(body.website)) {
      return NextResponse.json({ success: true, duplicate: false });
    }

    // Cloudflare Turnstile can be verified here later with TURNSTILE_SECRET.

    const values = sanitizeLead({
      fullName: text(body.fullName),
      phone: text(body.phone),
      phoneSecondary: text(body.phoneSecondary),
      email: text(body.email),
      instagram: text(body.instagram),
      governorate: text(body.governorate),
      address: text(body.address),
      university: text(body.university),
      major: text(body.major),
      academicYear: text(body.academicYear),
      courseInterest: Array.isArray(body.courseInterest) ? body.courseInterest.map(text) : [],
      attendancePreference: text(body.attendancePreference),
      baghdadSide: text(body.baghdadSide),
      futureCourseInterests: Array.isArray(body.futureCourseInterests)
        ? body.futureCourseInterests.map(text)
        : [],
      otherCourseInterest: text(body.otherCourseInterest),
      marketingConsent: Boolean(body.marketingConsent),
      website: "",
    });

    const errors = validateLead(values);
    if (hasLeadErrors(errors)) {
      return NextResponse.json(
        { success: false, error: Object.values(errors)[0] || t.form.errors.fullName },
        { status: 400 },
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const scriptSecret = process.env.GOOGLE_SCRIPT_SECRET;
    if (!scriptUrl || !scriptSecret) {
      return NextResponse.json(
        { success: false, error: "إعداد الخادم غير مكتمل." },
        { status: 500 },
      );
    }

    const labels = readableLeadFields(values);
    const couponCode = generateCouponCode();

    const gasResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: scriptSecret,
        lead: {
          fullName: values.fullName,
          phone: values.phone,
          phoneSecondary: values.phoneSecondary,
          email: values.email,
          instagram: values.instagram,
          governorate: labels.governorateLabel,
          address: values.address,
          university: values.university,
          major: values.major,
          academicYear: labels.academicYearLabel,
          courseInterest: labels.courseInterestLabels,
          futureCourseInterests: labels.courseInterestLabels,
          otherCourseInterest: values.otherCourseInterest,
          attendancePreference: labels.attendanceLabel,
          baghdadSide: labels.baghdadSideLabel,
          marketingConsent: values.marketingConsent,
          couponCode,
          utmSource: text(body.utmSource),
          utmMedium: text(body.utmMedium),
          utmCampaign: text(body.utmCampaign),
          utmContent: text(body.utmContent),
          referrer: text(body.referrer),
          landingPage: text(body.landingPage),
          userAgent: request.headers.get("user-agent")?.slice(0, 500) || "",
        },
      }),
      redirect: "follow",
    });

    const raw = await gasResponse.text();
    let result: { success?: boolean; duplicate?: boolean; error?: string };
    try {
      result = JSON.parse(raw) as {
        success?: boolean;
        duplicate?: boolean;
        error?: string;
      };
    } catch {
      return NextResponse.json(
        { success: false, error: "تعذر حفظ البيانات." },
        { status: 502 },
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "تعذر حفظ البيانات." },
        { status: 502 },
      );
    }

    // Never return the coupon to the browser.
    return NextResponse.json({
      success: true,
      duplicate: Boolean(result.duplicate),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "حدث خطأ. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}
