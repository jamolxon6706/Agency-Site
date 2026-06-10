import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/src/lib/seo";
import { isLang, processSteps, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) {
    return {};
  }

  return buildMetadata({
    lang,
    path: "/process",
    title: siteText[lang].nav.process,
    description:
      lang === "uz"
        ? "Discoverydan supportgacha to'liq loyiha jarayoni: arxitektura, build, QA, launch."
        : "Полный цикл проекта от discovery до support: архитектура, build, QA, launch.",
  });
}

export default async function ProcessPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <Reveal>
        <h1>{t.nav.process}</h1>
        <p className="hero-subtitle">
          {safeLang === "uz"
            ? "Noaniqlikni kamaytiradigan, deliverable-ga yo'naltirilgan va biznes natijani nazorat qiladigan workflow."
            : "Workflow, который снижает неопределенность, фиксирует deliverables и держит фокус на бизнес-результате."}
        </p>
      </Reveal>

      <div className="timeline section-space">
        {processSteps[safeLang].map((step, index) => (
          <Reveal key={step.title} delay={index * 0.04}>
            <article className="panel timeline-item">
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <article className="panel section-space">
          <h2>{safeLang === "uz" ? "SLA va kommunikatsiya" : "SLA и коммуникация"}</h2>
          <ul>
            <li>{safeLang === "uz" ? "Ish kunlarida 24 soat ichida javob" : "Ответ в течение 24 часов в рабочие дни"}</li>
            <li>{safeLang === "uz" ? "Sprint yakunida demo va status update" : "Демо и статус-апдейт по завершению спринта"}</li>
            <li>{safeLang === "uz" ? "Issue tracking va prioritetlash" : "Issue tracking и приоритизация задач"}</li>
          </ul>
        </article>
      </Reveal>
    </section>
  );
}

