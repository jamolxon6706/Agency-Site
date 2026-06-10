import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/src/lib/seo";
import { caseStudies, faqItems, isLang, processSteps, services, siteText, techStack, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) {
    return {};
  }

  const t = siteText[lang];
  return buildMetadata({
    lang,
    path: "/",
    title: t.hero.title,
    description: t.hero.subtitle,
  });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <>
      <section className="hero-section shell page-space">
        <Reveal>
          <p className="kicker">{t.hero.kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1>{t.hero.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15} className="hero-actions">
          <Link className="button" href={`/${safeLang}/contact`}>
            {t.hero.primaryCta}
          </Link>
          <Link className="button button-ghost" href={`/${safeLang}/work`}>
            {t.hero.secondaryCta}
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="hero-trust-line">{t.hero.trustLine}</p>
        </Reveal>

        <Reveal className="hero-metrics" delay={0.24}>
          <article>
            <h3>15+</h3>
            <p>{safeLang === "uz" ? "Ishlangan custom modul" : "Выполненных custom-модулей"}</p>
          </article>
          <article>
            <h3>24h</h3>
            <p>{safeLang === "uz" ? "Aloqaga qaytish SLA" : "SLA ответа"}</p>
          </article>
          <article>
            <h3>100%</h3>
            <p>{safeLang === "uz" ? "Custom arxitektura yondashuvi" : "Custom-подход к архитектуре"}</p>
          </article>
        </Reveal>
      </section>

      <section className="shell section-space">
        <SectionHeading title={t.trustBlockTitle} />
        <div className="panel-grid two-up">
          {t.trustPoints.map((point, index) => (
            <Reveal key={point} delay={0.04 * index}>
              <article className="panel">
                <p>{point}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <SectionHeading title={t.nav.services} />
        <div className="panel-grid three-up">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={0.04 * index}>
              <article className="panel service-card">
                <h3>{service.title[safeLang]}</h3>
                <p>{service.short[safeLang]}</p>
                <ul>
                  {service.outcomes[safeLang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={`/${safeLang}/services/${service.slug}`}>{safeLang === "uz" ? "Batafsil" : "Подробнее"}</Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <SectionHeading title={t.nav.work} subtitle={t.workIntro} />
        <div className="panel-grid three-up">
          {caseStudies.map((caseStudy, index) => (
            <Reveal key={caseStudy.slug} delay={0.04 * index}>
              <article className="panel case-card">
                <div className="image-wrap">
                  <Image src={caseStudy.media.src} alt={caseStudy.media.alt[safeLang]} width={1200} height={630} className="cover-image" />
                </div>
                <h3>{caseStudy.title[safeLang]}</h3>
                <p>{caseStudy.challenge[safeLang]}</p>
                <Link href={`/${safeLang}/work/${caseStudy.slug}`}>{safeLang === "uz" ? "Case study" : "Кейс"}</Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <SectionHeading title={t.processTitle} />
        <div className="panel-grid five-up">
          {processSteps[safeLang].map((step, index) => (
            <Reveal key={step.title} delay={0.03 * index}>
              <article className="panel process-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <SectionHeading title={safeLang === "uz" ? "Texnologiyalar" : "Технологический стек"} />
        <Reveal>
          <div className="stack-cloud">
            {techStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="shell section-space">
        <SectionHeading title={t.faqTitle} />
        <div className="faq-list">
          {faqItems[safeLang].map((faq, index) => (
            <Reveal key={faq.q} delay={0.03 * index}>
              <details className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <CtaBanner lang={safeLang} />
      </section>
    </>
  );
}
