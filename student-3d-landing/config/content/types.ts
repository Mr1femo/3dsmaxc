export type Locale = "ar" | "en";

export type NavLink = {
  href: string;
  label: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type SoftwareCard = {
  id: string;
  name: string;
  tagline: string;
  points: string[];
  accent: "gold" | "cyan" | "violet";
  image?: string;
};

export type CurriculumStep = {
  id: string;
  title: string;
  description: string;
};

export type FutureCourse = {
  id: string;
  name: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type FormErrors = {
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
  courseInterest: string;
  attendancePreference: string;
  baghdadSide: string;
  otherCourseInterest: string;
};

export type LandingContent = {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  brand: {
    name: string;
    shortName: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    support: string;
    courseName: string;
    discountLabel: string;
    discountValue: string;
    offerHook: string;
    offerPunchline: string;
    originalPriceLabel: string;
    originalPriceValue: string;
    priceLabel: string;
    priceValue: string;
    priceCurrency: string;
    priceNote: string;
    primaryCta: string;
    secondaryCta: string;
    visualCaption: string;
    proof: string;
    formatBadge: string;
    formatNote: string;
    stats: Array<{ value: string; label: string }>;
  };
  trustBar: {
    label: string;
    items: string[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    intro: string;
    items: BenefitItem[];
  };
  software: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: SoftwareCard[];
  };
  curriculum: {
    id: string;
    eyebrow: string;
    title: string;
    intro: string;
    steps: CurriculumStep[];
    note: string;
  };
  studentBenefits: {
    eyebrow: string;
    title: string;
    items: BenefitItem[];
  };
  discountCta: {
    title: string;
    text: string;
    cta: string;
  };
  futureCourses: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    courses: FutureCourse[];
  };
  form: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: {
      personal: string;
      university: string;
      interest: string;
      location: string;
    };
    fields: {
      fullName: string;
      phone: string;
      phoneSecondary: string;
      email: string;
      emailHint: string;
      instagram: string;
      governorate: string;
      address: string;
      university: string;
      major: string;
      academicYear: string;
      courseInterest: string;
      attendancePreference: string;
      attendanceNote: string;
      baghdadSide: string;
      futureCourses: string;
      otherCourse: string;
      marketingConsent: string;
    };
    academicYearOptions: SelectOption[];
    governorateOptions: SelectOption[];
    courseInterestOptions: SelectOption[];
    attendanceOptions: SelectOption[];
    baghdadSideOptions: SelectOption[];
    futureCourseOptions: SelectOption[];
    submit: string;
    submitting: string;
    submitError: string;
    errors: FormErrors;
    emailInvalid: string;
  };
  success: {
    title: string;
    duplicateTitle: string;
    subtitle: string;
    duplicateSubtitle: string;
    exploreCta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    text: string;
    cta: string;
  };
  help: {
    title: string;
    intro: string;
    instagramLabel: string;
    whatsappLabel: string;
  };
  footer: {
    note: string;
    rights: string;
  };
  stickyCta: {
    label: string;
    price: string;
  };
};
