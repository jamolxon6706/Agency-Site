import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/src/lib/seo";
import { getServiceBySlug, isLang, services, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string; service: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ lang: Lang; service: string }> = [];
  for (const lang of ["uz", "ru"] as const) {
    for (const service of services) {
      params.push({ lang, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, service } = await params;
  if (!isLang(lang)) {
    return {};
  }

  const item = getServiceBySlug(service);
  if (!item) {
    return {};
  }

  return buildMetadata({
    lang,
    path: `/services/${item.slug}`,
    title: item.title[lang],
    description: item.short[lang],
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { lang, service } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];
  const item = getServiceBySlug(service);

  if (!item) {
    notFound();
  }

  const deliverables =
    safeLang === "uz"
      ? [
          "Biznes jarayonlar auditi va texnik blueprint",
          "Arxitektura va integratsiya dizayni",
          "Iterativ ishlab chiqish va demo sessiyalar",
          "QA, deploy, monitoring va qo'llab-quvvatlash",
        ]
      : [
          "Аудит бизнес-процессов и технический blueprint",
          "Проектирование архитектуры и интеграций",
          "Итеративная разработка и demo-сессии",
          "QA, деплой, мониторинг и сопровождение",
        ];

  return (
    <section className="shell page-space">
      <Reveal>
        <p className="kicker">{t.nav.services}</p>
        <h1>{item.title[safeLang]}</h1>
        <p className="hero-subtitle">{item.short[safeLang]}</p>
      </Reveal>

      <div className="panel-grid two-up section-space">
        <Reveal>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Kutiladigan natijalar" : "Ожидаемые результаты"}</h2>
            <ul>
              {item.outcomes[safeLang].map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Asosiy deliverablelar" : "Ключевые deliverables"}</h2>
            <ul>
              {deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <article className="panel section-space">
          <h2>{safeLang === "uz" ? "Texnologik stack" : "Технологический стек"}</h2>
          <div className="chip-row">
            {item.stack.map((stack) => (
              <span className="chip" key={stack}>
                {stack}
              </span>
            ))}
          </div>
          <div className="button-row top-gap">
            <Link href={`/${safeLang}/contact`} className="button">
              {t.hero.primaryCta}
            </Link>
            <Link href={`/${safeLang}/work`} className="button button-ghost">
              {safeLang === "uz" ? "Case study lar" : "Кейсы"}
            </Link>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

