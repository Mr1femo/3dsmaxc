import { getContent } from "@/lib/i18n";
import type { LeadFormValues } from "@/lib/validation";

function labelFor(options: Array<{ value: string; label: string }>, value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function readableLeadFields(values: LeadFormValues) {
  const t = getContent().form;

  return {
    academicYearLabel: labelFor(t.academicYearOptions, values.academicYear),
    governorateLabel: labelFor(t.governorateOptions, values.governorate),
    courseInterestLabels: values.courseInterest
      .map((value) => labelFor(t.courseInterestOptions, value))
      .join(" | "),
    attendanceLabel: labelFor(t.attendanceOptions, values.attendancePreference),
    baghdadSideLabel: labelFor(t.baghdadSideOptions, values.baghdadSide),
  };
}
