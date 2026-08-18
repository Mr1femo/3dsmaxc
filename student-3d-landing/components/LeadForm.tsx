"use client";

import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { CouponSuccess } from "@/components/CouponSuccess";
import { siteConfig } from "@/config/landingPage";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { getContent } from "@/lib/i18n";
import { submitLead } from "@/lib/api";
import { getLandingPage, getReferrer, readStoredUtmParams } from "@/lib/tracking";
import {
  emptyLeadForm,
  hasLeadErrors,
  sanitizeLead,
  validateLead,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/validation";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {label}
        {hint ? <span className="mr-2 font-medium text-muted">({hint})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-foreground outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15";

export function LeadForm() {
  const t = getContent();
  const [values, setValues] = useState<LeadFormValues>(emptyLeadForm);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ duplicate: boolean } | null>(null);
  const [submitError, setSubmitError] = useState("");

  const showOther = values.courseInterest.includes("other");

  function update<K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) {
    if (!started) {
      setStarted(true);
      trackEvent("form_start");
    }
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleCourseInterest(value: string) {
    const selected = values.courseInterest.includes(value)
      ? values.courseInterest.filter((item) => item !== value)
      : [...values.courseInterest, value];

    update("courseInterest", selected);
    trackEvent("future_course_selected", { course: value });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (hasLeadErrors(nextErrors)) return;

    trackEvent("form_submit");
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await submitLead({
        ...sanitizeLead(values),
        ...readStoredUtmParams(),
        referrer: getReferrer(),
        landingPage: getLandingPage(),
      });

      if (!response.success) {
        setSubmitError(response.error || t.form.submitError);
        return;
      }

      setResult({ duplicate: Boolean(response.duplicate) });
      trackEvent("lead_created", { duplicate: Boolean(response.duplicate) });
    } catch {
      setSubmitError(t.form.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  const inputProps = useMemo(
    () =>
      (id: keyof LeadFormValues) => ({
        id,
        name: id,
        "aria-invalid": Boolean(errors[id]),
        "aria-describedby": errors[id] ? `${id}-error` : undefined,
      }),
    [errors],
  );

  if (result) {
    return (
      <section id={siteConfig.formId} className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <CouponSuccess duplicate={result.duplicate} />
        </div>
      </section>
    );
  }

  return (
    <section id={siteConfig.formId} className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-bold text-brand">
          {t.form.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl">{t.form.title}</h2>
        <p className="mt-4 text-lg leading-8 text-muted">{t.form.intro}</p>

        <form onSubmit={onSubmit} className="soft-card relative mt-10 space-y-10 rounded-[32px] p-5 sm:p-8" noValidate>
          <fieldset className="space-y-4">
            <legend className="text-xl font-extrabold">{t.form.groups.personal}</legend>
            <Field id="fullName" label={t.form.fields.fullName} error={errors.fullName}>
              <input
                {...inputProps("fullName")}
                className={inputClass}
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                autoComplete="name"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="phone" label={t.form.fields.phone} error={errors.phone}>
                <input
                  {...inputProps("phone")}
                  className={inputClass}
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>
              <Field
                id="phoneSecondary"
                label={t.form.fields.phoneSecondary}
                error={errors.phoneSecondary}
              >
                <input
                  {...inputProps("phoneSecondary")}
                  className={inputClass}
                  value={values.phoneSecondary}
                  onChange={(event) => update("phoneSecondary", event.target.value)}
                  inputMode="tel"
                />
              </Field>
            </div>
            <Field
              id="email"
              label={t.form.fields.email}
              hint={t.form.fields.emailHint}
              error={errors.email}
            >
              <input
                {...inputProps("email")}
                className={inputClass}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                type="email"
                autoComplete="email"
              />
            </Field>
            <Field id="instagram" label={t.form.fields.instagram} error={errors.instagram}>
              <input
                {...inputProps("instagram")}
                className={inputClass}
                value={values.instagram}
                onChange={(event) => update("instagram", event.target.value)}
                placeholder="@username"
                dir="ltr"
              />
            </Field>
            <Field id="governorate" label={t.form.fields.governorate} error={errors.governorate}>
              <select
                {...inputProps("governorate")}
                className={inputClass}
                value={values.governorate}
                onChange={(event) => update("governorate", event.target.value)}
                autoComplete="address-level1"
              >
                <option value="">—</option>
                {t.form.governorateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="address" label={t.form.fields.address} error={errors.address}>
              <textarea
                {...inputProps("address")}
                className={cn(inputClass, "min-h-24 py-3")}
                value={values.address}
                onChange={(event) => update("address", event.target.value)}
                placeholder="المنطقة، الحي، أقرب نقطة دالة"
                autoComplete="street-address"
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl font-extrabold">{t.form.groups.university}</legend>
            <Field id="university" label={t.form.fields.university} error={errors.university}>
              <input
                {...inputProps("university")}
                className={inputClass}
                value={values.university}
                onChange={(event) => update("university", event.target.value)}
              />
            </Field>
            <Field id="major" label={t.form.fields.major} error={errors.major}>
              <input
                {...inputProps("major")}
                className={inputClass}
                value={values.major}
                onChange={(event) => update("major", event.target.value)}
              />
            </Field>
            <Field
              id="academicYear"
              label={t.form.fields.academicYear}
              error={errors.academicYear}
            >
              <select
                {...inputProps("academicYear")}
                className={inputClass}
                value={values.academicYear}
                onChange={(event) => update("academicYear", event.target.value)}
              >
                <option value="">—</option>
                {t.form.academicYearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl font-extrabold">{t.form.groups.interest}</legend>
            <p className="text-sm text-muted">يمكنك اختيار أكثر من خيار</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {t.form.courseInterestOptions.map((option) => {
                const selected = values.courseInterest.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center rounded-xl border px-4 text-sm font-bold transition",
                      selected
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-slate-200 bg-slate-50 text-slate-700",
                    )}
                  >
                    <input
                      type="checkbox"
                      name="courseInterest"
                      value={option.value}
                      checked={selected}
                      onChange={() => toggleCourseInterest(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            {errors.courseInterest ? (
              <p className="text-sm text-red-500" role="alert">
                {errors.courseInterest}
              </p>
            ) : null}
            {showOther ? (
              <Field
                id="otherCourseInterest"
                label={t.form.fields.otherCourse}
                error={errors.otherCourseInterest}
              >
                <input
                  {...inputProps("otherCourseInterest")}
                  className={inputClass}
                  value={values.otherCourseInterest}
                  onChange={(event) => update("otherCourseInterest", event.target.value)}
                />
              </Field>
            ) : null}
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl font-extrabold">{t.form.groups.location}</legend>
            <p className="rounded-2xl bg-brand-soft px-4 py-3 text-sm leading-7 text-slate-700">
              {t.form.fields.attendanceNote}
            </p>
            <p className="text-sm font-bold">{t.form.fields.attendancePreference}</p>
            <div className="grid gap-2">
              {t.form.attendanceOptions.map((option) => {
                const selected = values.attendancePreference === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center rounded-xl border px-4 text-sm font-bold",
                      selected
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-slate-200 text-slate-700",
                    )}
                  >
                    <input
                      type="radio"
                      name="attendancePreference"
                      value={option.value}
                      checked={selected}
                      onChange={() => {
                        update("attendancePreference", option.value);
                        if (option.value === "no-recorded") {
                          update("baghdadSide", "");
                        }
                      }}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            {errors.attendancePreference ? (
              <p className="text-sm text-red-500" role="alert">
                {errors.attendancePreference}
              </p>
            ) : null}

            {values.attendancePreference === "yes-extra" ||
            values.attendancePreference === "maybe" ? (
              <>
                <p className="pt-2 text-sm font-bold">{t.form.fields.baghdadSide}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {t.form.baghdadSideOptions.map((option) => {
                    const selected = values.baghdadSide === option.value;
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm font-bold",
                          selected
                            ? "border-brand bg-brand-soft text-brand"
                            : "border-slate-200 text-slate-700",
                        )}
                      >
                        <input
                          type="radio"
                          name="baghdadSide"
                          value={option.value}
                          checked={selected}
                          onChange={() => update("baghdadSide", option.value)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {errors.baghdadSide ? (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.baghdadSide}
                  </p>
                ) : null}
              </>
            ) : null}
          </fieldset>

          <label className="flex items-start gap-3 text-sm leading-7 text-muted">
            <input
              type="checkbox"
              checked={values.marketingConsent}
              onChange={(event) => update("marketingConsent", event.target.checked)}
              className="mt-1 h-5 w-5 accent-brand"
            />
            {t.form.fields.marketingConsent}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex min-h-14 w-full items-center justify-center rounded-xl text-base font-bold transition disabled:opacity-70"
          >
            {submitting ? t.form.submitting : t.form.submit}
          </button>
          {submitError ? (
            <p className="text-center text-sm text-red-500" role="alert">
              {submitError}
            </p>
          ) : null}

          <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
