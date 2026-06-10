import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/src/lib/seo";
import { isLang, services, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) {
    return {};
  }

  const title = siteText[lang].nav.services;
  return buildMetadata({
    lang,
    path: "/services",
    title,
    description:
      lang === "uz"
        ? "Custom CRM, Telegram bot, dashboard, landing va korporativ saytlar bo'yicha professional xizmatlar."
        : "Профессиональные услуги по custom CRM, Telegram-ботам, дашбордам, landing и корпоративным сайтам.",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <SectionHeading
        title={t.nav.services}
        subtitle={
          safeLang === "uz"
            ? "Har bir xizmat biznes maqsadga bog'langan holda custom arxitektura asosida quriladi."
            : "Каждая услуга реализуется как custom-архитектура под конкретную бизнес-цель."
        }
      />

      <div className="panel-grid two-up">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.04}>
            <article className="panel service-card large">
              <h2>{service.title[safeLang]}</h2>
              <p>{service.short[safeLang]}</p>
              <h3>{safeLang === "uz" ? "Natija" : "Результат"}</h3>
              <ul>
                {service.outcomes[safeLang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>{safeLang === "uz" ? "Texnologiyalar" : "Технологии"}</h3>
              <div className="chip-row">
                {service.stack.map((stack) => (
                  <span key={stack} className="chip">
                    {stack}
                  </span>
                ))}
              </div>
              <Link href={`/${safeLang}/services/${service.slug}`} className="button button-ghost">
                {safeLang === "uz" ? "Batafsil ko'rish" : "Подробнее"}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

