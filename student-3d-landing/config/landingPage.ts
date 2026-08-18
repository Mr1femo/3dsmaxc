export const siteConfig = {
  locale: "ar" as const,
  direction: "rtl" as const,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  formId: "lead-form",
  curriculumId: "curriculum",
  softwareId: "software",
  futureCoursesId: "future-courses",
  faqId: "faq",
  /**
   * Phase 1 only — used to preview the success screen.
   * Phase 2 will replace this with the server-issued coupon.
   */
  phase: 1,
  previewCouponCode: "STUDENT10",
  offer: {
    discountUsd: 350,
    studentPriceIqd: 150000,
    format: "pre-recorded" as const,
  },
  seo: {
    twitterHandle: "",
  },
  support: {
    instagram: "KARAZ_CH",
    instagramUrl: "https://instagram.com/KARAZ_CH",
    whatsapp: "07760980906",
    whatsappUrl: "https://wa.me/9647760980906",
  },
};

export const academicYearValues = [
  "year-1",
  "year-2",
  "year-3",
  "year-4",
  "year-5",
  "graduate",
  "other",
] as const;

export const courseInterestValues = [
  "advanced-corona-vray",
  "intermediate-max-corona-vray",
  "advanced-max-corona-vray",
  "autocad",
  "photoshop",
  "media-buying",
  "motion-design",
  "office",
  "graduation-research",
  "other",
] as const;

export const attendanceValues = [
  "yes-extra",
  "no-recorded",
  "maybe",
] as const;

export const baghdadSideValues = [
  "rasafa",
  "karkh",
  "undecided",
] as const;

export const futureCourseValues = [
  "advanced-corona-vray",
  "intermediate-max-corona-vray",
  "advanced-max-corona-vray",
  "autocad",
  "photoshop",
  "media-buying",
  "motion-design",
  "office",
  "graduation-research",
  "other",
] as const;

export type AcademicYearValue = (typeof academicYearValues)[number];
export type CourseInterestValue = (typeof courseInterestValues)[number];
export type AttendanceValue = (typeof attendanceValues)[number];
export type BaghdadSideValue = (typeof baghdadSideValues)[number];
export type FutureCourseValue = (typeof futureCourseValues)[number];
