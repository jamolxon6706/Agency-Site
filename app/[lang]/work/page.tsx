import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/src/lib/seo";
import { caseStudies, isLang, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) {
    return {};
  }

  const title = siteText[lang].nav.work;
  const description =
    lang === "uz"
      ? "Anonymized case studylar: CRM platformalar, Telegram botlar, dashboard va integratsiya tizimlari."
      : "Анонимизированные кейсы: CRM-платформы, Telegram-боты, дашборды и интеграционные системы.";

  return buildMetadata({ lang, path: "/work", title, description });
}

export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <Reveal>
        <p className="kicker">{t.workIntro}</p>
        <h1>{t.nav.work}</h1>
      </Reveal>

      <div className="panel-grid three-up section-space">
        {caseStudies.map((caseStudy, index) => (
          <Reveal key={caseStudy.slug} delay={index * 0.04}>
            <article className="panel case-card">
              <div className="image-wrap">
                <Image
                  src={caseStudy.media.src}
                  alt={caseStudy.media.alt[safeLang]}
                  width={1200}
                  height={630}
                  className="cover-image"
                />
              </div>
              <p className="muted">{caseStudy.industry[safeLang]}</p>
              <h2>{caseStudy.title[safeLang]}</h2>
              <p>{caseStudy.challenge[safeLang]}</p>
              <Link href={`/${safeLang}/work/${caseStudy.slug}`} className="button button-ghost">
                {safeLang === "uz" ? "Case study ochish" : "Открыть кейс"}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

