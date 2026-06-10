"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/src/lib/content";
import { services } from "@/src/lib/content";
import { budgetOptions, timelineOptions } from "@/src/lib/leads";

type Props = {
  lang: Lang;
};

type FormState = {
  name: string;
  company: string;
  role: string;
  phone_or_telegram: string;
  email: string;
  service_interest: string[];
  budget_range: (typeof budgetOptions)[number];
  timeline: (typeof timelineOptions)[number];
  project_summary: string;
  preferred_language: Lang;
  consent: boolean;
  website: string;
};

const text = {
  uz: {
    name: "Ism",
    company: "Kompaniya",
    role: "Lavozim",
    phone: "Telefon yoki Telegram",
    email: "Email",
    services: "Qiziqayotgan xizmatlar",
    budget: "Byudjet diapazoni",
    timeline: "Timeline",
    summary: "Loyiha haqida",
    consent: "Ma'lumotlarimni qayta ishlashga roziman",
    submit: "So'rov yuborish",
    sending: "Yuborilmoqda...",
    error: "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
    budgetMap: {
      "under-3k": "$3,000 dan past",
      "3k-7k": "$3,000 - $7,000",
      "7k-15k": "$7,000 - $15,000",
      "15k-plus": "$15,000+",
    },
    timelineMap: {
      asap: "Imkon qadar tez",
      "2-4-weeks": "2-4 hafta",
      "1-2-months": "1-2 oy",
      "3-months-plus": "3+ oy",
    },
  },
  ru: {
    name: "Имя",
    company: "Компания",
    role: "Должность",
    phone: "Телефон или Telegram",
    email: "Email",
    services: "Интересующие услуги",
    budget: "Бюджет",
    timeline: "Сроки",
    summary: "Описание проекта",
    consent: "Я согласен(на) на обработку данных",
    submit: "Отправить заявку",
    sending: "Отправка...",
    error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    budgetMap: {
      "under-3k": "До $3,000",
      "3k-7k": "$3,000 - $7,000",
      "7k-15k": "$7,000 - $15,000",
      "15k-plus": "$15,000+",
    },
    timelineMap: {
      asap: "Как можно скорее",
      "2-4-weeks": "2-4 недели",
      "1-2-months": "1-2 месяца",
      "3-months-plus": "3+ месяцев",
    },
  },
} as const;

export function LeadForm({ lang }: Props) {
  const router = useRouter();
  const t = text[lang];

  const [state, setState] = useState<FormState>({
    name: "",
    company: "",
    role: "",
    phone_or_telegram: "",
    email: "",
    service_interest: [],
    budget_range: "3k-7k",
    timeline: "1-2-months",
    project_summary: "",
    preferred_language: lang,
    consent: false,
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasServices = useMemo(() => state.service_interest.length > 0, [state.service_interest.length]);

  function toggleService(slug: string) {
    setState((current) => {
      if (current.service_interest.includes(slug)) {
        return {
          ...current,
          service_interest: current.service_interest.filter((item) => item !== slug),
        };
      }

      return {
        ...current,
        service_interest: [...current.service_interest, slug],
      };
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasServices || !state.consent) {
      setErrorMessage(t.error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(payload?.error || t.error);
        setIsSubmitting(false);
        return;
      }

      router.push(`/${lang}/thank-you`);
    } catch {
      setErrorMessage(t.error);
      setIsSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="field-grid two">
        <label>
          {t.name}
          <input
            required
            value={state.name}
            onChange={(event) => setState((current) => ({ ...current, name: event.target.value }))}
          />
        </label>

        <label>
          {t.email}
          <input
            type="email"
            required
            value={state.email}
            onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
      </div>

      <div className="field-grid two">
        <label>
          {t.phone}
          <input
            required
            value={state.phone_or_telegram}
            onChange={(event) => setState((current) => ({ ...current, phone_or_telegram: event.target.value }))}
          />
        </label>

        <label>
          {t.company}
          <input value={state.company} onChange={(event) => setState((current) => ({ ...current, company: event.target.value }))} />
        </label>
      </div>

      <label>
        {t.role}
        <input value={state.role} onChange={(event) => setState((current) => ({ ...current, role: event.target.value }))} />
      </label>

      <fieldset>
        <legend>{t.services}</legend>
        <div className="check-grid">
          {services.map((service) => {
            const checked = state.service_interest.includes(service.slug);
            return (
              <label key={service.slug} className="check-chip">
                <input type="checkbox" checked={checked} onChange={() => toggleService(service.slug)} />
                <span>{service.title[lang]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="field-grid two">
        <label>
          {t.budget}
          <select
            value={state.budget_range}
            onChange={(event) =>
              setState((current) => ({ ...current, budget_range: event.target.value as FormState["budget_range"] }))
            }
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {t.budgetMap[option]}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t.timeline}
          <select
            value={state.timeline}
            onChange={(event) => setState((current) => ({ ...current, timeline: event.target.value as FormState["timeline"] }))}
          >
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {t.timelineMap[option]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        {t.summary}
        <textarea
          required
          rows={6}
          value={state.project_summary}
          onChange={(event) => setState((current) => ({ ...current, project_summary: event.target.value }))}
        />
      </label>

      <label className="hidden-honeypot" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={state.website}
          onChange={(event) => setState((current) => ({ ...current, website: event.target.value }))}
        />
      </label>

      <label className="consent-row">
        <input
          type="checkbox"
          checked={state.consent}
          onChange={(event) => setState((current) => ({ ...current, consent: event.target.checked }))}
        />
        <span>{t.consent}</span>
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.sending : t.submit}
      </button>
    </form>
  );
}

