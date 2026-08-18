import { getContent } from "@/lib/i18n";

export type LeadFormValues = {
  fullName: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  instagram: string;
  governorate: string;
  address: string;
  university: string;
  major: string;
  academicYear: string;
  courseInterest: string[];
  attendancePreference: string;
  baghdadSide: string;
  futureCourseInterests: string[];
  otherCourseInterest: string;
  marketingConsent: boolean;
  website: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export const emptyLeadForm: LeadFormValues = {
  fullName: "",
  phone: "",
  phoneSecondary: "",
  email: "",
  instagram: "",
  governorate: "",
  address: "",
  university: "",
  major: "",
  academicYear: "",
  courseInterest: [],
  attendancePreference: "",
  baghdadSide: "",
  futureCourseInterests: [],
  otherCourseInterest: "",
  marketingConsent: false,
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{8,20}$/;

function clean(value: string) {
  return value.trim();
}

export function sanitizeLead(values: LeadFormValues): LeadFormValues {
  return {
    ...values,
    fullName: clean(values.fullName),
    phone: clean(values.phone),
    phoneSecondary: clean(values.phoneSecondary),
    email: clean(values.email).toLowerCase(),
    instagram: clean(values.instagram).replace(/^@/, ""),
    governorate: clean(values.governorate),
    address: clean(values.address),
    university: clean(values.university),
    major: clean(values.major),
    academicYear: clean(values.academicYear),
    courseInterest: values.courseInterest.map((item) => clean(item)),
    attendancePreference: clean(values.attendancePreference),
    baghdadSide: clean(values.baghdadSide),
    otherCourseInterest: clean(values.otherCourseInterest),
    futureCourseInterests: values.courseInterest.map((item) => clean(item)),
    website: values.website,
  };
}

export function validateLead(values: LeadFormValues): LeadFormErrors {
  const t = getContent().form;
  const data = sanitizeLead(values);
  const errors: LeadFormErrors = {};

  if (!data.fullName) errors.fullName = t.errors.fullName;
  if (!data.phone || !PHONE_PATTERN.test(data.phone)) errors.phone = t.errors.phone;
  if (!data.phoneSecondary || !PHONE_PATTERN.test(data.phoneSecondary)) {
    errors.phoneSecondary = t.errors.phoneSecondary;
  }
  if (data.email && !EMAIL_PATTERN.test(data.email)) errors.email = t.emailInvalid;
  if (!data.instagram) errors.instagram = t.errors.instagram;
  if (!t.governorateOptions.some((option) => option.value === data.governorate)) {
    errors.governorate = t.errors.governorate;
  }
  if (!data.address) errors.address = t.errors.address;
  if (!data.university) errors.university = t.errors.university;
  if (!data.major) errors.major = t.errors.major;
  if (!data.academicYear) errors.academicYear = t.errors.academicYear;
  if (!data.courseInterest.length) errors.courseInterest = t.errors.courseInterest;
  if (!data.attendancePreference) {
    errors.attendancePreference = t.errors.attendancePreference;
  }
  const wantsInPerson =
    data.attendancePreference === "yes-extra" || data.attendancePreference === "maybe";
  if (wantsInPerson && !data.baghdadSide) errors.baghdadSide = t.errors.baghdadSide;
  if (data.courseInterest.includes("other") && !data.otherCourseInterest) {
    errors.otherCourseInterest = t.errors.otherCourseInterest;
  }

  return errors;
}

export function hasLeadErrors(errors: LeadFormErrors) {
  return Object.keys(errors).length > 0;
}
